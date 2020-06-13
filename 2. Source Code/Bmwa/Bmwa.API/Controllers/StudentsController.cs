using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Bmwa.API.Data.Repositories;
using Bmwa.API.Dtos.Student;
using Bmwa.API.Utils;
using Bmwa.API.Utils.Params;
using Microsoft.AspNetCore.Mvc;

namespace Bmwa.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly IStudentRepository _repo;
        private readonly IMapper _mapper;
        public StudentsController(IStudentRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetStudents([FromQuery] StudentParams studentParams)
        {
            var students = await _repo.GetStudents(studentParams);
            var studentsToReturn = _mapper.Map<IEnumerable<StudentForListDto>>(students);
            
            Response.AddPagination(students.CurrentPage, students.PageSize, students.TotalCount, students.TotalPages);

            return Ok(studentsToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStudent(int id)
        {
            var student = await _repo.GetStudent(id);
            var studentToReturn = _mapper.Map<StudentForDetailDto>(student);
            return Ok(student);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id,[FromForm] StudentForDetailDto studentForDetailDto) {
            string res = await _repo.Update(id, studentForDetailDto);
            if (res != null)
                return BadRequest(res);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id) {
            string res = await _repo.Delete(id);
            if (res != null)
                return BadRequest(res);
            return Ok();
        }
    }
}