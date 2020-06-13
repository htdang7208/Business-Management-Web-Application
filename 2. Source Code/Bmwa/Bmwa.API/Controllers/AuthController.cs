using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Bmwa.API.Data;
using Bmwa.API.Dtos;
using Bmwa.API.Dtos.Admin;
using Bmwa.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Bmwa.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            _config = config;
            _repo = repo;
            _mapper = mapper;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(AdminForLoginDto adminForLoginDto)
        {
            var adminFromRepo = await _repo.Login(adminForLoginDto.Username.ToLower(), adminForLoginDto.Password);

            if (adminFromRepo == null)
                return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, adminFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, adminFromRepo.Username)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var admin = _mapper.Map<AdminForListDto>(adminFromRepo);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                admin
            });
        }
        
        [HttpPost("register")]
        public async Task<IActionResult> Register(AdminToRegisterDto adminToRegisterDto) {
            adminToRegisterDto.Username = adminToRegisterDto.Username.ToLower();

            if (await _repo.AdminExists(adminToRegisterDto.Username)) {
                return BadRequest("Username already exists!");
            } 

            var admin = await _repo.Register(adminToRegisterDto);

            if (await _repo.saveAll()) {
                return BadRequest("Register fail!");
            }

            return StatusCode(201, admin);
        }
    }
}