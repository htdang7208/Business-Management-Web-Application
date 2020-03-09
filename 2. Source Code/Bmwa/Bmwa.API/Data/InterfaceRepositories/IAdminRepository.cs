using System.Collections.Generic;
using System.Threading.Tasks;
using Bmwa.API.Models;

namespace Bmwa.API.Data.InterfaceRepositories
{
    public interface IAdminRepository
    {
         void Add<T> (T entity) where T: class;
         void Delete<T> (T entity) where T: class;
         Task<bool> SaveAll();
         Task<IEnumerable<Admin>> GetAdmins();
         Task<Admin> GetAdmin(int id);
    }
}