using System.Threading.Tasks;
using Bmwa.API.Models;

namespace Bmwa.API.Data
{
    public interface IAuthRepository
    {
         Task<Admin> Register(Admin admin, string password);
         Task<Admin> Login(string username, string password);
         Task<bool> AdminExists(string username);
    }
}