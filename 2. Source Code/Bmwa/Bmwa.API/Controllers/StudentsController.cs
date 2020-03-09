using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Bmwa.API.Data.InterfaceRepositories;
using Bmwa.API.Dtos;
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
        public async Task<IActionResult> GetStudents()
        {
            var students = await _repo.GetStudents();
            var studentsToReturn = _mapper.Map<IEnumerable<StudentDto>>(students);
            return Ok(studentsToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStudent(int id)
        {
            var student = await _repo.GetStudent(id);
            var studentToReturn = _mapper.Map<StudentDto>(student);
            return Ok(studentToReturn);
        }
    }
}