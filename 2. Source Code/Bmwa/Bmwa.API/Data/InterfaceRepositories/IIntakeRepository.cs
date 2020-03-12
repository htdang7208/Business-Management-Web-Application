using System.Collections.Generic;
using System.Threading.Tasks;
using Bmwa.API.Dtos;
using Bmwa.API.Models;

namespace Bmwa.API.Data.InterfaceRepositories
{
    public interface IIntakeRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<IEnumerable<Intake>> GetIntakes();
        Task<Intake> GetIntake(int id);
        Task<bool> IsExists(string name);
        Task<Intake> UpdateIntake(IntakeForTransformDto source, Intake destination);
        Task<Intake> AddIntake(IntakeForTransformDto intakeForTransformDto);
    }
}