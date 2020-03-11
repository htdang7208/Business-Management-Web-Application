using System.Collections.Generic;
using System.Threading.Tasks;
using Bmwa.API.Data.InterfaceRepositories;
using Bmwa.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Bmwa.API.Data.Repositories
{
    public class IntakeRepository : IIntakeRepository
    {
        private readonly DataContext _context;
        public IntakeRepository(DataContext context)
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

        public async Task<Intake> GetIntake(int id)
        {
            var intake = await _context.Intakes.FirstOrDefaultAsync(i => i.Id == id);
            return intake;
        }

        public async Task<IEnumerable<Intake>> GetIntakes()
        {
            var intakes = await _context.Intakes.ToListAsync();
            return intakes;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}