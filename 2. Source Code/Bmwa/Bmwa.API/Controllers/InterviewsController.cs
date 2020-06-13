using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Bmwa.API.Data;
using Bmwa.API.Dtos;
using Bmwa.API.Dtos.Interview;
using Bmwa.API.Models;
using Bmwa.API.Utils;
using Bmwa.API.Utils.Params;
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
        public async Task<IActionResult> GetInterviews([FromQuery] InterviewParams interviewParams)
        {
            var interviews = await _repo.GetInterviews(interviewParams);
            var interviewsToReturn = _mapper.Map<IEnumerable<InterviewDto>>(interviews);

            Response.AddPagination(interviews.CurrentPage, interviews.PageSize, interviews.TotalCount, interviews.TotalPages);

            return Ok(interviewsToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetInterview(int id)
        {
            var interview = await _repo.GetInterview(id);
            var interviewToReturn = _mapper.Map<InterviewDto>(interview);
            return Ok(interviewToReturn);
        }

        [HttpPost]
        public async Task<IActionResult> AddInterview(Interview interview) {
            string res = await _repo.Add(interview);
            if (res != null)
                return BadRequest(res);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInterview(int id) {
            string res = await _repo.Delete(id);
            if (res != null)
                return BadRequest(res);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInterview(int id, Interview interview) {
            string res = await _repo.Update(id, interview);
            if (res != null)
                return BadRequest(res);
            return Ok();
        }
    }
}