using System.Threading.Tasks;
using Bmwa.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bmwa.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class InterviewsController : ControllerBase
    {
        private readonly IInterviewRepository _repo;
        public InterviewsController(IInterviewRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetInterviews() {
            var interviews = await _repo.GetInterviews();
            return Ok(interviews);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetInterview(int id) {
            var interview = await _repo.GetInterview(id);
            return Ok(interview);
        }
    }
}