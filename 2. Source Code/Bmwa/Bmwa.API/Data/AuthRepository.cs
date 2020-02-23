using System;
using System.Threading.Tasks;
using Bmwa.API.Models;
using Bmwa.API.Utils;
using Microsoft.EntityFrameworkCore;

namespace Bmwa.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> AdminExists(string username)
        {
            if (await _context.Admins.AnyAsync(x => x.Username == username))
                return true;
            return false;
        }

        public async Task<Admin> Login(string username, string password)
        {
            var admin = await _context.Admins.FirstOrDefaultAsync(x => x.Username == username);

            if (admin == null) return null;

            if (admin.PasswordHash != Helper.Genhash(password)) return null;

            return admin;
        }

        public async Task<Admin> Register(Admin admin, string password)
        {
            admin.PasswordHash = Helper.Genhash(password);

            await _context.Admins.AddAsync(admin);
            await _context.SaveChangesAsync();

            return admin;
        }
    }
}