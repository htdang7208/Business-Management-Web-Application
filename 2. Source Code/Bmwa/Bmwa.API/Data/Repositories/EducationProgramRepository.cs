using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bmwa.API.Dtos;
using Bmwa.API.Models;
using Bmwa.API.Utils;
using Bmwa.API.Utils.Params;
using Microsoft.EntityFrameworkCore;

namespace Bmwa.API.Data.Repositories
{
    public interface IEducationProgramRepository
    {
        Task<IEnumerable<EducationProgram>> GetAll();
        Task<IEnumerable<Subject>> GetSubjectsByEducationId(int id);
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
        public async Task<IEnumerable<Subject>> GetSubjectsByEducationId(int id)
        {
            var subjects = await _context.SubjectPrograms.Include(eps => eps.Subject)
            .Where(eps => eps.SubjectId == eps.Subject.Id && eps.EduProgId == id)
            .Select(s => new Subject
            {
                Id = s.SubjectId,
                Name = s.Subject.Name,
                Code = s.Subject.Code,
                MinScore = s.Subject.MinScore,
                HoursCount = s.Subject.HoursCount,
                MinutesCount = s.Subject.MinutesCount,
                LessonCount = s.Subject.LessonCount,
                IsDelete = s.Subject.IsDelete
            }).ToListAsync();
            return subjects;
        }

        public async Task<string> Add(SubjectProgramForAddDto subjectProgramDto)
        {
            var edu = await _context.EducationPrograms.FirstOrDefaultAsync(e => e.Name == subjectProgramDto.EducationProgram.Name);
            if (edu != null)
                return "This education program is existed";
            await _context.EducationPrograms.AddAsync(new EducationProgram
            {
                Name = subjectProgramDto.EducationProgram.Name,
                IsDelete = false
            });

            if (await SaveAll() == false)
                return "Saving to be failed";

            edu = await _context.EducationPrograms.FirstOrDefaultAsync(e => e.Name == subjectProgramDto.EducationProgram.Name);
            foreach (int id in subjectProgramDto.SubjectIDList)
            {
                await _context.SubjectPrograms.AddAsync(new SubjectProgram
                {
                    EduProgId = edu.Id,
                    SubjectId = id
                });

                if (await SaveAll() == false)
                    return "Saving to be failed";
            }
            return null;
        }

        public async Task<string> Update(int id, SubjectProgramForUpdateDto spDto)
        {
            var edu = await _context.EducationPrograms.FirstOrDefaultAsync(e => e.Id == id);
            if (edu == null)
                return "Cannot find this education program";
            edu.Name = spDto.EducationProgram.Name;
            _context.EducationPrograms.Update(edu);

            var spList = await _context.SubjectPrograms.Where(s => s.EduProgId == id).ToListAsync();
            for (int i = 0; i < spDto.SubjectPrograms.Count; i++)
            {
                if (spList[i].SubjectId != spDto.SubjectPrograms[i].SubjectId) {
                    spList[i].SubjectId = spDto.SubjectPrograms[i].SubjectId;
                }
            }
            _context.SubjectPrograms.UpdateRange(spList);
            if (await SaveAll() == false)
                return "Saving to be failed";
            return null;
        }

        public async Task<string> Delete(int id) {
            var edu = await _context.EducationPrograms.FirstOrDefaultAsync(e => e.Id == id);
            if (edu == null)
                return "Cannot find this education program";
            _context.EducationPrograms.Remove(edu);
            if (await SaveAll() == false)
                return "Saving to be failed";
            return null;
        }
    }
}