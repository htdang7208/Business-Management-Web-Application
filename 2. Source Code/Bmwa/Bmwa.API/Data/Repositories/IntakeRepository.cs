using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bmwa.API.Data.InterfaceRepositories;
using Bmwa.API.Dtos;
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

        public async Task<Intake> AddIntake(IntakeForTransformDto intakeForTransformDto)
        {
            var intake = new Intake
            {
                Name = intakeForTransformDto.Name,
                DateBegin = intakeForTransformDto.DateBegin,
                DateEnd = intakeForTransformDto.DateEnd,
                WeekAmount = intakeForTransformDto.WeekAmount,
                IsShown = false
            };
            
            await _context.Intakes.AddAsync(intake);

            return intake;
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Intake> GetIntake(int id)
        {
            var intake = await _context.Intakes.FirstOrDefaultAsync(i => i.Id == id && i.IsShown == false);
            
            if (intake != null)
                return intake;
            return null;
        }

        public async Task<IEnumerable<Intake>> GetIntakes()
        {
            var intakes = await _context.Intakes.Where(i => i.IsShown == false).ToListAsync();
            return intakes;
        }

        public async Task<bool> IsExists(string name)
        {
            var intake = await _context.Intakes.FirstOrDefaultAsync(i => i.Name == name);

            if (intake == null) {
                return false;
            }

            return true;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Intake> UpdateIntake(IntakeForTransformDto source, Intake destination)
        {
            destination.Name = source.Name;
            destination.DateBegin = source.DateBegin;
            destination.DateEnd = source.DateEnd;
            destination.WeekAmount = source.WeekAmount;
            destination.IsShown = false;

            _context.Intakes.Update(destination);
            
            return destination;
        }
    }
}