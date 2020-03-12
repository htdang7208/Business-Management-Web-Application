using System.Collections;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Bmwa.API.Data;
using Bmwa.API.Data.InterfaceRepositories;
using Bmwa.API.Dtos;
using Bmwa.API.Models;
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
        public async Task<IActionResult> GetIntakes()
        {
            var intakes = await _repo.GetIntakes();
            var intakesToReturn = _mapper.Map<IEnumerable<IntakeForTransformDto>>(intakes);
            return Ok(intakesToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetIntake(int id)
        {
            var intake = await _repo.GetIntake(id);

            if (intake == null) 
                return BadRequest($"This intake is not exists on database");
            
            var intakesToReturn = _mapper.Map<IntakeForTransformDto>(intake);
            return Ok(intakesToReturn);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, IntakeForTransformDto intakeForTransformDto)
        {
            var intake = await _repo.GetIntake(intakeForTransformDto.Id);
            if (intake == null) 
                return BadRequest($"This intake is not exists on database");
            
            await _repo.UpdateIntake(intakeForTransformDto, intake);

            if (await _repo.SaveAll())
            {
                return NoContent();
            }

            return BadRequest($"Updating intake {id} failed on save");
        }
        [HttpPost]
        public async Task<IActionResult> Post(IntakeForTransformDto intakeForTransformDto) {
            
            if (await _repo.IsExists(intakeForTransformDto.Name) == true) 
                return BadRequest($"This intake is existed on database");
            
            var intake = await _repo.AddIntake(intakeForTransformDto);
            var intakeToReturn = _mapper.Map<IntakeForTransformDto>(intake);

            if (await _repo.SaveAll())
                return CreatedAtAction("GetIntake", new { id = intakeToReturn.Id }, intakeToReturn);
            
            return BadRequest($"Add intake is not succeed");
        }
    }
}