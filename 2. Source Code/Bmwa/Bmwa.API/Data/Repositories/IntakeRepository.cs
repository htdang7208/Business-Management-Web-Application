using System;
using System.Linq;
using System.Threading.Tasks;
using Bmwa.API.Models;
using Bmwa.API.Utils;
using Bmwa.API.Utils.Params;
using Microsoft.EntityFrameworkCore;

namespace Bmwa.API.Data.Repositories
{
    public interface IIntakeRepository
    {
        Task<bool> SaveAll();
        Task<PagedList<Intake>> GetIntakes(IntakeParams intakeParams);
        Task<Intake> GetIntake(int id);
        Task<string> Update(int id, Intake intake);
        Task<string> Add(Intake intake);
        Task<string> Delete(int id);
    }
    public class IntakeRepository : IIntakeRepository
    {
        private readonly DataContext _context;
        public IntakeRepository(DataContext context) => _context = context;

        public async Task<bool> SaveAll() {
            int res = await _context.SaveChangesAsync();
            return res > 0;
        }

        public async Task<PagedList<Intake>> GetIntakes(IntakeParams intakeParams)
        {
            var intakes = _context.Intakes.Where(i => i.IsShown == true).AsQueryable();

            if (intakeParams.Name != null)
                intakes = _context.Intakes.Where(i => i.Name.Contains(intakeParams.Name));

            if (intakeParams.WeekAmount > 0)
                intakes = _context.Intakes.Where(i => i.WeekAmount == intakeParams.WeekAmount);

            if (intakeParams.DateBeginFrom != DateTime.MinValue)
                intakes = _context.Intakes.Where(i => i.DateBegin.Date >= intakeParams.DateBeginFrom.Date);

            if (intakeParams.DateBeginTo != DateTime.MinValue)
                intakes = _context.Intakes.Where(i => i.DateBegin.Date <= intakeParams.DateBeginTo.Date);

            if (intakeParams.DateEndFrom != DateTime.MinValue)
                intakes = _context.Intakes.Where(i => i.DateEnd.Date >= intakeParams.DateEndFrom.Date);

            if (intakeParams.DateEndTo != DateTime.MinValue)
                intakes = _context.Intakes.Where(i => i.DateEnd.Date <= intakeParams.DateEndTo.Date);

            return await PagedList<Intake>.CreateAsync(intakes, intakeParams.PageNumber, intakeParams.PageSize);
        }

        public async Task<Intake> GetIntake(int id)
        {
            var intake = await _context.Intakes.FirstOrDefaultAsync(i => i.Id == id && i.IsShown == true);

            if (intake != null)
                return intake;
            return null;
        }

        public async Task<string> Update(int id, Intake intake)
        {
            var intakeFromDB = await GetIntake(id);

            if (intakeFromDB == null)
                return "Cannot find this intake";

            intakeFromDB.Name = intake.Name;
            intakeFromDB.WeekAmount = intake.WeekAmount;
            intakeFromDB.DateBegin = intake.DateBegin.Date;
            intakeFromDB.DateEnd = Helper.FindDateEnd(intake);

            _context.Intakes.Update(intakeFromDB);
            
            if (await SaveAll() == false)
                return "Saving to be failed";
            
            return null;
        }

        public async Task<string> Add(Intake intake)
        {
            var intakeFromDB = await _context.Intakes.FirstOrDefaultAsync(i => i.Name == intake.Name);

            if (intakeFromDB != null)
            {
                if (intakeFromDB.IsShown)
                    return "This intake is existed";
                else
                    return "This intake is existed - it doesn't display";
            }

            if (intake.WeekAmount < 0)
                return "Week amount must > 0";

            await _context.Intakes.AddAsync(new Intake
            {
                Name = intake.Name,
                DateBegin = intake.DateBegin,
                DateEnd = Helper.FindDateEnd(intake),
                WeekAmount = intake.WeekAmount,
                IsShown = true
            });

            if (await SaveAll() == false)
                return "Saving to be failed";
                
            return null;
        }

        public async Task<string> Delete(int id)
        {
            var intakeFromDB = await GetIntake(id);
            
            if (intakeFromDB == null)
                return "Cannot find this intake";

            intakeFromDB.IsShown = false;

            _context.Intakes.Update(intakeFromDB);

            if (await SaveAll() == false)
                return "Saving to be failed";
            
            return null;
        }
    }
}