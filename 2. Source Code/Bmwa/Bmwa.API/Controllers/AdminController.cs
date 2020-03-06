using System.Threading.Tasks;
using Bmwa.API.Data;
using Bmwa.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bmwa.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _context;
        public AdminController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.Admins.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var admin = await _context.Admins.FirstOrDefaultAsync(x => x.Id == id);

            if (admin == null)
                return BadRequest("Admin is not exists!");
            return Ok(admin);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, AdminToUpdateInfo adminToUpdateInfo)
        {
            var admin = await _context.Admins.FirstOrDefaultAsync(x => x.Id == id);

            if (admin == null)
            {
                return BadRequest("Admin is not exists!");
            }

            admin.Email = adminToUpdateInfo.Email;
            _context.Admins.Update(admin);
            await _context.SaveChangesAsync();

            return Ok("Update successfully!");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var admin = await _context.Admins.FirstOrDefaultAsync(x => x.Id == id);

            if (admin == null)
            {
                return BadRequest("Admin is not exists!");
            }

            _context.Admins.Remove(admin);
            await _context.SaveChangesAsync();

            return Ok("Delete successfully!");
        }
    }
}