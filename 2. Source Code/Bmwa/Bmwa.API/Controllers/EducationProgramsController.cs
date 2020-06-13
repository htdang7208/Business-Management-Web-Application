using System.Threading.Tasks;
using Bmwa.API.Data.Repositories;
using Bmwa.API.Utils;
using Bmwa.API.Utils.Params;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bmwa.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EducationProgramsController : ControllerBase
    {
        private readonly IEducationProgramRepository _repo;
        public EducationProgramsController(IEducationProgramRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("nopage")]
        public async Task<IActionResult> GetAll() {
            var educationPrograms = await _repo.GetAll();

            return Ok(educationPrograms);
        }
        [HttpGet]
        public async Task<IActionResult> GetEducationPrograms([FromQuery] EducationProgramParams educationProgramParams) {
            var educationPrograms = await _repo.GetEducationPrograms(educationProgramParams);

            Response.AddPagination(
                educationPrograms.CurrentPage,
                educationPrograms.PageSize,
                educationPrograms.TotalCount,
                educationPrograms.TotalPages);
            return Ok(educationPrograms);
        }
    }
}