using System.Collections;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Bmwa.API.Data;
using Bmwa.API.Data.Repositories;
using Bmwa.API.Dtos;
using Bmwa.API.Models;
using Bmwa.API.Utils;
using Bmwa.API.Utils.Params;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bmwa.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class IntakesController : ControllerBase
    {
        private readonly IIntakeRepository _repo;
        private readonly IMapper _mapper;
        public IntakesController(IIntakeRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetIntakes([FromQuery]IntakeParams intakeParams)
        {
            var intakes = await _repo.GetIntakes(intakeParams);
            var intakesToReturn = _mapper.Map<IEnumerable<Intake>>(intakes);

            Response.AddPagination(intakes.CurrentPage, intakes.PageSize, intakes.TotalCount, intakes.TotalPages);

            return Ok(intakesToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetIntake(int id)
        {
            var intake = await _repo.GetIntake(id);

            if (intake == null) 
                return BadRequest($"This intake is not exists on database");
            
            var intakesToReturn = _mapper.Map<Intake>(intake);
            return Ok(intakesToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateIntake(int id, Intake intakeForUpdate)
        {            
            string res = await _repo.Update(id, intakeForUpdate);
            if (res != null)
                return BadRequest(res);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> AddIntake(Intake intake) {
            
            var res = await _repo.Add(intake);
            if (res != null)
                return BadRequest(res);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIntake(int id)
        {            
            string res = await _repo.Delete(id);
            if (res != null)
                return BadRequest(res);
            return Ok();
        }
    }
}