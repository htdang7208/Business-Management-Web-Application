using System.Collections.Generic;
using System.Threading.Tasks;
using Bmwa.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Bmwa.API.Data
{
    public class InterviewRepository : IInterviewRepository
    {
        private readonly DataContext _context;
        public InterviewRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Interview> GetInterview(int id)
        {
            var interview = await _context.Interviews.Include(u => u.Student).FirstOrDefaultAsync(i => i.Id == id);
            return interview;
        }

        public async Task<IEnumerable<Interview>> GetInterviews()
        {
            var interviews = await _context.Interviews.Include(s => s.Student).ToListAsync();
            return interviews;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}