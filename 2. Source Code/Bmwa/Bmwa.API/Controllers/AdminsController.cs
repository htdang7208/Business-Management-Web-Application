using System.Collections;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Bmwa.API.Data;
using Bmwa.API.Data.InterfaceRepositories;
using Bmwa.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bmwa.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminsController : ControllerBase
    {
        private readonly IAdminRepository _repo;
        private readonly IMapper _mapper;
        public AdminsController(IAdminRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAdmins()
        {
            var admins = await _repo.GetAdmins();
            var adminsToReturn = _mapper.Map<IEnumerable<AdminForListDto>>(admins);
            return Ok(adminsToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAdmin(int id)
        {
            var admin = await _repo.GetAdmin(id);
            var adminToReturn = _mapper.Map<AdminForDetailDto>(admin);
            return Ok(adminToReturn);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, AdminForUpdateDto adminForUpdateDto) {
            // Phương thức này được sử dụng nhằm kiểm tra xem user hiện tại có phải là user với
            // thông tin như trong token đã up lên server
            // đồng thời ngăn việc không phải chủ của id này mà đi sửa thông tin của id này
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
                return Unauthorized();
            }

            // Việc sử dụng UserForUpdateDto cũng nhằm mục đích ngăn chặn việc
            // cung cấp thông tin không đủ các mục cần để cập nhật

            // Phương thức Map(..,..) được sử dụng để map dữ liệu từ
            // userForUpdateDto sang user trong repository
            var adminFromRepo = await _repo.GetAdmin(id);
            _mapper.Map(adminForUpdateDto, adminFromRepo);

            if (await _repo.SaveAll()) {
                return NoContent();
            }

            throw new System.Exception($"Updating admin {id} failed on save");
        }
    }
}