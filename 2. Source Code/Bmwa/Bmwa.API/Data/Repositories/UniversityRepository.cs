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
    public interface IUniversityRepository
    {
        Task<string> Add(University University);
        Task<string> Delete(int id);
        Task<University> GetUniversity(int id);
        Task<PagedList<University>> GetUniversities(UniversityParams universityParams);
        Task<bool> SaveAll();
        Task<string> Update(int id, University university);
    }

    public class UniversityRepository : IUniversityRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UniversityRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<bool> SaveAll()
        {
            int res = await _context.SaveChangesAsync();
            return res > 0;
        }
        public async Task<PagedList<University>> GetUniversities(UniversityParams universityParams)
        {
            var universities = _context.Universities.Where(c => c.IsDelete == false);

            if (universityParams.Name != null)
                universities = _context.Universities.Where(c => c.Name.Contains(universityParams.Name));

            return await PagedList<University>.CreateAsync(universities, universityParams.PageNumber, universityParams.PageSize);
        }
        public async Task<University> GetUniversity(int id)
        {
            return await _context.Universities.FirstOrDefaultAsync(c => c.Id == id && c.IsDelete == false);
        }
        public async Task<string> Add(University university)
        {
            var universityFromDB = await _context.Universities
                .FirstOrDefaultAsync(c => c.Name == university.Name);
            if (universityFromDB != null && universityFromDB.IsDelete == true)
                return "This university is existed";
            if (universityFromDB != null && universityFromDB.IsDelete == false)
                return "This university is deleted";

            university.IsDelete = false;
            await _context.Universities.AddAsync(university);

            if (await SaveAll() == false)
                return "Saving to be failed";
            return null;
        }
        public async Task<string> Update(int id, University university)
        {
            var universityFromDB = await GetUniversity(id);
            if (universityFromDB == null)
                return "Cannot find this university";

            universityFromDB.Name = university.Name;
            universityFromDB.Phone = university.Phone;
            universityFromDB.Email = university.Email;
            universityFromDB.Address = university.Address;
            universityFromDB.PersonContact = university.PersonContact;
            universityFromDB.IsDelete = false;
            _context.Universities.Update(universityFromDB);

            if (await SaveAll() == false)
                return "Saving to be failed";
            return null;
        }
        public async Task<string> Delete(int id)
        {
            var universityFromDB = await GetUniversity(id);
            if (universityFromDB == null)
                return "Cannot find this university";

            universityFromDB.IsDelete = true;
            _context.Universities.Update(universityFromDB);

            if (await SaveAll() == false)
                return "Saving to be failed";
            return null;
        }
    }
}