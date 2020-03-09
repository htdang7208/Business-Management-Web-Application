using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Bmwa.API.Data;
using Bmwa.API.Dtos;
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
        private readonly IMapper _mapper;
        public InterviewsController(IInterviewRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetInterviews()
        {
            var interviews = await _repo.GetInterviews();
            var interviewsToReturn = _mapper.Map<IEnumerable<InterviewDto>>(interviews);
            return Ok(interviewsToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetInterview(int id)
        {
            var interview = await _repo.GetInterview(id);
            var interviewToReturn = _mapper.Map<InterviewDto>(interview);
            return Ok(interviewToReturn);
        }
    }
}