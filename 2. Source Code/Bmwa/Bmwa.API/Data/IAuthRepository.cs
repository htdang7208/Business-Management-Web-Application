using System.Threading.Tasks;
using Bmwa.API.Dtos;
using Bmwa.API.Models;

namespace Bmwa.API.Data
{
    public interface IAuthRepository
    {
         Task<Admin> Register(AdminToRegisterDto adminToRegisterDto);
         Task<Admin> Login(string username, string password);
         Task<bool> AdminExists(string username);
    }
}