using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bmwa.API.Models;
using Bmwa.API.Utils;
using Bmwa.API.Utils.Params;
using Microsoft.EntityFrameworkCore;

namespace Bmwa.API.Data.Repositories
{
    public interface IEducationProgramRepository
    {
        Task<IEnumerable<EducationProgram>> GetAll();
        Task<PagedList<EducationProgram>> GetEducationPrograms(EducationProgramParams educationProgramParams);
        Task<bool> SaveAll();
    }

    public class EducationProgramRepository : IEducationProgramRepository
    {
        private readonly DataContext _context;
        public EducationProgramRepository(DataContext context) => _context = context;
        public async Task<bool> SaveAll()
        {
            int res = await _context.SaveChangesAsync();
            return res > 0;
        }
        public async Task<IEnumerable<EducationProgram>> GetAll()
        {
            var educationPrograms = await _context.EducationPrograms.Where(e => e.IsDelete == false).ToListAsync();
            return educationPrograms;
        }
        public async Task<PagedList<EducationProgram>> GetEducationPrograms(EducationProgramParams educationProgramParams)
        {
            var educationPrograms = _context.EducationPrograms.Where(e => e.IsDelete == false);
            return await PagedList<EducationProgram>
            .CreateAsync(educationPrograms, educationProgramParams.PageNumber, educationProgramParams.PageSize);
        }
    }
}