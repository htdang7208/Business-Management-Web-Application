using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Bmwa.API.Models;
using Bmwa.API.Utils;
using Bmwa.API.Utils.Params;
using Microsoft.EntityFrameworkCore;

namespace Bmwa.API.Data.Repositories
{
    public interface ICompanyRepository
    {
        Task<string> Add(Company company);
        Task<string> Delete(int id);
        Task<Company> GetCompany(int id);
        Task<PagedList<Company>> GetCompanies(CompanyParams companyParams);
        Task<bool> SaveAll();
        Task<string> Update(int id, Company company);
    }

    public class CompanyRepository : ICompanyRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CompanyRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<bool> SaveAll()
        {
            int res = await _context.SaveChangesAsync();
            return res > 0;
        }
        public async Task<PagedList<Company>> GetCompanies(CompanyParams companyParams)
        {
            var companies = _context.Companies.Where(c => c.IsDelete == false);

            if (companyParams.Name != null)
                companies = _context.Companies.Where(c => c.Name.Contains(companyParams.Name));

            return await PagedList<Company>.CreateAsync(companies, companyParams.PageNumber, companyParams.PageSize);
        }
        public async Task<Company> GetCompany(int id)
        {
            return await _context.Companies.FirstOrDefaultAsync(c => c.Id == id && c.IsDelete == false);
        }
        public async Task<string> Add(Company company)
        {
            var comFromDB = await _context.Companies
                .FirstOrDefaultAsync(c => c.Name == company.Name);
            if (comFromDB != null && comFromDB.IsDelete == true)
                return "This company is existed";
            if (comFromDB != null && comFromDB.IsDelete == false)
                return "This company is deleted";

            company.IsDelete = false;
            await _context.Companies.AddAsync(company);

            if (await SaveAll() == false)
                return "Saving to be failed";
            return null;
        }
        public async Task<string> Update(int id, Company company)
        {
            var comFromDB = await GetCompany(id);
            if (comFromDB == null)
                return "Cannot find this company";

            comFromDB.Name = company.Name;
            comFromDB.Phone = company.Phone;
            comFromDB.Email = company.Email;
            comFromDB.Address = company.Address;
            comFromDB.PersonContact = company.PersonContact;
            comFromDB.IsDelete = false;
            _context.Companies.Update(comFromDB);

            if (await SaveAll() == false)
                return "Saving to be failed";
            return null;
        }
        public async Task<string> Delete(int id)
        {
            var comFromDB = await GetCompany(id);
            if (comFromDB == null)
                return "Cannot find this company";

            comFromDB.IsDelete = true;
            _context.Companies.Update(comFromDB);

            if (await SaveAll() == false)
                return "Saving to be failed";
            return null;
        }
    }
}