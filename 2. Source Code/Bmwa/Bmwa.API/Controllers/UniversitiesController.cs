using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Bmwa.API.Data.Repositories;
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
    public class UniversitiesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUniversityRepository _repo;
        public UniversitiesController(IUniversityRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetUniversities([FromQuery] UniversityParams universityParams)
        {
            var universities = await _repo.GetUniversities(universityParams);
            var universitiesToReturn = _mapper.Map<IEnumerable<University>>(universities);

            Response.AddPagination(universities.CurrentPage, universities.PageSize, universities.TotalCount, universities.TotalPages);

            return Ok(universitiesToReturn);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUniversity(int id)
        {
            var university = await _repo.GetUniversity(id);
            if (university == null)
                return BadRequest("This university is not existed");
            return Ok(university);
        }
        [HttpPost]
        public async Task<IActionResult> AddUniversity(University university)
        {
            string res = await _repo.Add(university);
            if (res != null)
                return BadRequest(res);
            return Ok();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUniversity(int id, University university)
        {
            string res = await _repo.Update(id, university);
            if (res != null)
                return BadRequest(res);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUniversity(int id)
        {
            string res = await _repo.Delete(id);
            if (res != null)
                return BadRequest(res);
            return Ok();
        }
    }
}