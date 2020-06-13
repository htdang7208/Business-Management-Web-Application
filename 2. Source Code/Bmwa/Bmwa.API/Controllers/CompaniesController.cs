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
    public class CompaniesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ICompanyRepository _repo;
        public CompaniesController(ICompanyRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetCompanies([FromQuery] CompanyParams companyParams)
        {
            var companies = await _repo.GetCompanies(companyParams);
            var companiesToReturn = _mapper.Map<IEnumerable<Company>>(companies);

            Response.AddPagination(companies.CurrentPage, companies.PageSize, companies.TotalCount, companies.TotalPages);

            return Ok(companiesToReturn);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompany(int id)
        {
            var company = await _repo.GetCompany(id);
            if (company == null)
                return BadRequest("This company is not existed");
            return Ok(company);
        }
        [HttpPost]
        public async Task<IActionResult> AddCompany(Company company)
        {
            string res = await _repo.Add(company);
            if (res != null)
                return BadRequest(res);
            return Ok();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCompany(int id, Company company)
        {
            string res = await _repo.Update(id, company);
            if (res != null)
                return BadRequest(res);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            string res = await _repo.Delete(id);
            if (res != null)
                return BadRequest(res);
            return Ok();
        }
    }
}