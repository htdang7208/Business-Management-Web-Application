using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bmwa.API.Models;
using Bmwa.API.Utils;
using Bmwa.API.Utils.Params;
using Microsoft.EntityFrameworkCore;

namespace Bmwa.API.Data
{
    public interface IInterviewRepository
    {
        Task<bool> SaveAll();
        Task<PagedList<Interview>> GetInterviews(InterviewParams interviewParams);
        Task<Interview> GetInterview(int id);
        Task<string> Update(int id, Interview interviewForUpdate);
        Task<string> Add(Interview interviewForUpdate);
        Task<string> Delete(int id);
    }
    public class InterviewRepository : IInterviewRepository
    {
        private readonly DataContext _context;
        public InterviewRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<string> Add(Interview interview)
        {
            var interviewFromDB = await _context.Interviews.FirstOrDefaultAsync(
                i => i.Name == interview.Name || i.Date == interview.Date
            );

            if (interviewFromDB != null)
                return "This interview is existed";

            interviewFromDB = new Interview
            {
                Name = interview.Name,
                Date = interview.Date,
                IsShown = true
            };

            await _context.AddAsync(interviewFromDB);

            if (await SaveAll() == false)
                return "Saving to be failed";
            return null;
        }

        public async Task<string> Delete(int id)
        {
            var interviewFromDB = await GetInterview(id);

            if (interviewFromDB == null)
                return "Cannot find this interview";

            interviewFromDB.IsShown = false;
            _context.Interviews.Update(interviewFromDB);

            if (await SaveAll() == false)
                return "Saving to be failed";
            return null;
        }

        public async Task<Interview> GetInterview(int id)
        {
            return await _context.Interviews
                .Include(i => i.Students)
                .FirstOrDefaultAsync(i => i.Id == id && i.IsShown == true);
        }

        public async Task<PagedList<Interview>> GetInterviews(InterviewParams interviewParams)
        {
            var interviews = _context.Interviews
                .Where(i => i.IsShown == true);

            if (interviewParams.Name != null)
                interviews = _context.Interviews.Where(i => i.Name.Contains(interviewParams.Name));

            if (interviewParams.Date != DateTime.MinValue)
                interviews = _context.Interviews.Where(i => i.Date.Date >= interviewParams.Date.Date);

            return await PagedList<Interview>
                .CreateAsync(interviews, interviewParams.PageNumber, interviewParams.PageSize);
        }

        public async Task<bool> SaveAll() => await _context.SaveChangesAsync() > 0;

        public async Task<string> Update(int id, Interview interviewForUpdate)
        {
            var interviewFromDB = await GetInterview(id);

            if (interviewFromDB == null)
                return "Cannot find this interview";

            interviewFromDB.Name = interviewForUpdate.Name;
            interviewFromDB.Date = interviewForUpdate.Date;

            _context.Interviews.Update(interviewFromDB);

            if (await SaveAll() == false)
                return "Saving to be failed";
            return null;
        }
    }
}