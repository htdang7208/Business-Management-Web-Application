using System.Collections.Generic;
using System.Threading.Tasks;
using Bmwa.API.Models;

namespace Bmwa.API.Data
{
    public interface IInterviewRepository
    {
         void Add<T> (T entity) where T: class;
         void Delete<T> (T entity) where T: class;
         Task<bool> SaveAll();
         Task<IEnumerable<Interview>> GetInterviews();
         Task<Interview> GetInterview(int id);
    }
}