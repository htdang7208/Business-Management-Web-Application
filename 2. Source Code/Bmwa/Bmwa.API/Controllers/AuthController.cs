using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Bmwa.API.Data;
using Bmwa.API.Dtos;
using Bmwa.API.Models;
using DatingApp.API.Dtos;
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
        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _config = config;
            _repo = repo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(AdminToRegisterDto adminToRegisterDto)
        {
            adminToRegisterDto.Username = adminToRegisterDto.Username.ToLower();

            if (await _repo.AdminExists(adminToRegisterDto.Username))
                return BadRequest("Username already exists!");

            await _repo.Register(adminToRegisterDto);

            return StatusCode(201);
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

            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });
        }
    }
}