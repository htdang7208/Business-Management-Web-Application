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
        public IntakesController(IIntakeRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetIntakes()
        {
            var intakes = await _repo.GetIntakes();
            return Ok(intakes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetIntake(int id)
        {
            var intakeFromRepo = await _repo.GetIntake(id);
            return Ok(intakeFromRepo);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateIntake(int id, Intake intake) {
            
            var intakeFromRepo = await _repo.GetIntake(id);

            intakeFromRepo.Name = intake.Name;
            intakeFromRepo.DateBegin = intake.DateBegin;
            intakeFromRepo.DateEnd = intake.DateEnd;
            intakeFromRepo.WeekAmount = intake.WeekAmount;

            if (await _repo.SaveAll()) {
                return NoContent();
            }

            throw new System.Exception($"Updating intake {id} failed on save");
        }
    }
}