using System.Collections.Generic;
using System.Threading.Tasks;
using Bmwa.API.Data.InterfaceRepositories;
using Bmwa.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Bmwa.API.Data.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly DataContext _context;
        public AdminRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Admin> GetAdmin(int id)
        {
            var admin = await _context.Admins.Include(p => p.Photos).FirstOrDefaultAsync(i => i.Id == id);
            return admin;
        }

        public async Task<IEnumerable<Admin>> GetAdmins()
        {
            var admins = await _context.Admins.Include(p => p.Photos).ToListAsync();
            return admins;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}