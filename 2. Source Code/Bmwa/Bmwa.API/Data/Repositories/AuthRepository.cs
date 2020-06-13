using System;
using System.Threading.Tasks;
using Bmwa.API.Dtos;
using Bmwa.API.Dtos.Admin;
using Bmwa.API.Models;
using Bmwa.API.Utils;
using Microsoft.EntityFrameworkCore;

namespace Bmwa.API.Data
{
    public interface IAuthRepository
    {
         Task<Admin> Login(string username, string password);
         Task<bool> AdminExists(string username);
         Task<Admin> Register(AdminToRegisterDto adminToRegisterDto);
         Task<bool> saveAll();
    }
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Admin> Login(string username, string password)
        {
            var admin = await _context.Admins.Include(a => a.Photos).FirstOrDefaultAsync(x => x.Username == username);

            if (admin == null) return null;

            if (admin.Password != Helper.Genhash(password)) 
                return null;

            return admin;
        }
        
        public async Task<bool> AdminExists(string username)
        {
            if (await _context.Admins.AnyAsync(x => x.Username == username))
                return true;
            return false;
        }

        public async Task<Admin> Register(AdminToRegisterDto adminToRegisterDto)
        {
            var admin = new Admin
            {
                Username = adminToRegisterDto.Username,
                Password = Helper.Genhash(adminToRegisterDto.Password),
                Email = adminToRegisterDto.Email,
                Phone = adminToRegisterDto.Phone,
                Address = adminToRegisterDto.Address,
                Gender = adminToRegisterDto.Gender,
                IsShown = adminToRegisterDto.IsShown,
                Created = adminToRegisterDto.Created,
                LastActive = adminToRegisterDto.LastActive
            };
            await _context.Admins.AddAsync(admin);
            return admin;
        }

        public async Task<bool> saveAll() {
            return await _context.SaveChangesAsync() > 1;
        }
    }
}