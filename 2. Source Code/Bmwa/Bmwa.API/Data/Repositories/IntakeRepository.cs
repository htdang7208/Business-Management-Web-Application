using System;
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
    public interface IIntakeRepository
    {
        Task<bool> SaveAll();
        Task<PagedList<IntakeForListDto>> GetIntakes(IntakeParams intakeParams);
        Task<Intake> GetIntake(int id);
        Task<string> Update(int id, Intake intake);
        Task<string> Add(Intake intake);
        Task<string> Delete(int id);
    }
    public class IntakeRepository : IIntakeRepository
    {
        private readonly DataContext _context;
        public IntakeRepository(DataContext context) => _context = context;

        public async Task<bool> SaveAll()
        {
            int res = await _context.SaveChangesAsync();
            return res > 0;
        }

        public async Task<PagedList<IntakeForListDto>> GetIntakes(IntakeParams intakeParams)
        {
            var intakes = _context.Intakes.Join(
                _context.EducationPrograms,
                i=>i.EduProgId,
                e=>e.Id,
                (i, e) => new IntakeForListDto{
                    Id = i.Id,
                    Name = i.Name,
                    DateBegin = i.DateBegin,
                    DateEnd = i.DateEnd,
                    WeekCount = i.WeekCount,
                    EducationProgramName = e.Name,
                    IsDelete = i.IsDelete
                }
            ).Where(i => i.IsDelete == false).OrderByDescending(i => i.Name).AsQueryable();

            if (intakeParams.Name != null)
                intakes = intakes.Where(i => i.Name.Contains(intakeParams.Name));

            if (intakeParams.WeekCount > 0)
                intakes = intakes.Where(i => i.WeekCount == intakeParams.WeekCount);

            if (intakeParams.DateBegin != DateTime.MinValue)
                intakes = intakes.Where(i => i.DateBegin.Date >= intakeParams.DateBegin.Date);

            if (intakeParams.DateEnd != DateTime.MinValue)
                intakes = intakes.Where(i => i.DateEnd.Date >= intakeParams.DateEnd.Date);

            return await PagedList<IntakeForListDto>.CreateAsync(intakes, intakeParams.PageNumber, intakeParams.PageSize);
        }

        public async Task<Intake> GetIntake(int id)
        {
            var intake = await _context.Intakes.FirstOrDefaultAsync(i => i.Id == id && i.IsDelete == false);

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
            intakeFromDB.WeekCount = intake.WeekCount;
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
                if (intakeFromDB.IsDelete)
                    return "This intake is existed";
                else
                    return "This intake is existed - it doesn't display";
            }

            if (intake.WeekCount < 0)
                return "Week amount must > 0";

            await _context.Intakes.AddAsync(new Intake
            {
                Name = intake.Name,
                DateBegin = intake.DateBegin,
                DateEnd = Helper.FindDateEnd(intake),
                WeekCount = intake.WeekCount,
                IsDelete = false
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

            intakeFromDB.IsDelete = true;

            _context.Intakes.Update(intakeFromDB);

            if (await SaveAll() == false)
                return "Saving to be failed";

            return null;
        }
    }
}