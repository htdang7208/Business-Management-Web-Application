using System.Threading.Tasks;
using Bmwa.API.Data;
using Bmwa.API.Dtos;
using Bmwa.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bmwa.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        public AuthController(IAuthRepository repo)
        {
            _repo = repo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(AdminToRegisterDto adminToRegisterDto) {
            adminToRegisterDto.Username = adminToRegisterDto.Username.ToLower();

            if (await _repo.AdminExists(adminToRegisterDto.Username))
                return BadRequest("Username already exists!");

            var admin = new Admin 
            { 
                Name = adminToRegisterDto.Name,
                Username = adminToRegisterDto.Username,
                ImageUrl = adminToRegisterDto.ImageUrl
            };
            await _repo.Register(admin, adminToRegisterDto.PasswordHash);

            return StatusCode(201);
        }
    }
}