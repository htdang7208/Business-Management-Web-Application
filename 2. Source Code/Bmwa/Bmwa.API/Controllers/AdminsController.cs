using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Bmwa.API.Data.Repositories;
using Bmwa.API.Dtos.Admin;
using Bmwa.API.Utils;
using Bmwa.API.Utils.Params;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bmwa.API.Controllers
{
    [ServiceFilter(typeof(LogAdminActivity))]
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
        public async Task<IActionResult> GetAdmins([FromQuery] AdminParams adminParams)
        {
            var admins = await _repo.GetAdmins(adminParams);
            var adminsToReturn = _mapper.Map<IEnumerable<AdminForListDto>>(admins);

            Response.AddPagination(admins.CurrentPage, admins.PageSize, admins.TotalCount, admins.TotalPages);

            return Ok(adminsToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAdmin(int id)
        {
            var admin = await _repo.GetAdmin(id);
            var adminToReturn = _mapper.Map<AdminForDetailDto>(admin);
            return Ok(adminToReturn);
        }

        [HttpPut("{id}/profile")]
        public async Task<IActionResult> UpdateAdminProfile(int id, AdminForUpdateProfileDto adminForUpdateProfileDto)
        {
            // Phương thức này được sử dụng nhằm kiểm tra xem user hiện tại có phải là user với
            // thông tin như trong token đã up lên server
            // đồng thời ngăn việc không phải chủ của id này mà đi sửa thông tin của id này
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            // Việc sử dụng UserForUpdateDto cũng nhằm mục đích ngăn chặn việc
            // cung cấp thông tin không đủ các mục cần để cập nhật

            // Phương thức Map(..,..) được sử dụng để map dữ liệu từ
            // userForUpdateDto sang user trong repository
            var adminFromRepo = await _repo.GetAdmin(id);
            _mapper.Map(adminForUpdateProfileDto, adminFromRepo);

            if (await _repo.SaveAll())
            {
                return NoContent();
            }

            throw new System.Exception($"Updating admin profile {id} failed on save!");
        }

        [HttpPut("{id}/password")]
        public async Task<IActionResult> UpdateAdminPassword(int id, AdminForUpdatePasswordDto adminForUpdatePassword)
        {
            // Phương thức này được sử dụng nhằm kiểm tra xem user hiện tại có phải là user với
            // thông tin như trong token đã up lên server
            // đồng thời ngăn việc không phải chủ của id này mà đi sửa thông tin của id này
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            // Việc sử dụng UserForUpdateDto cũng nhằm mục đích ngăn chặn việc
            // cung cấp thông tin không đủ các mục cần để cập nhật

            // Phương thức Map(..,..) được sử dụng để map dữ liệu từ
            // userForUpdateDto sang user trong repository
            var adminFromRepo = await _repo.GetAdmin(id);
            adminForUpdatePassword.OldPassword = Helper.Genhash(adminForUpdatePassword.OldPassword);

            if (adminFromRepo.Password != adminForUpdatePassword.OldPassword)
            {
                return BadRequest("Old password is not right!");
            }

            adminFromRepo.Password = Helper.Genhash(adminForUpdatePassword.NewPassword);

            if (await _repo.SaveAll())
            {
                return NoContent();
            }

            return BadRequest($"Updating admin password {id} failed on save!");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdmin(int id)
        {
            var admin = await _repo.GetAdmin(id);

            if (admin == null)
                return BadRequest("Admin is not exists!");
            else
                _repo.Delete(admin);

            if (await _repo.SaveAll())
                return Ok();
            return BadRequest("Fail to delete!");
        }
    }
}