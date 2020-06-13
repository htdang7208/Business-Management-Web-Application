using System;
using System.Linq;
using System.Threading.Tasks;
using Bmwa.API.Models;
using Bmwa.API.Utils;
using Bmwa.API.Utils.Params;
using Microsoft.EntityFrameworkCore;

namespace Bmwa.API.Data.Repositories
{
    public interface IAdminRepository
    {
         void Add<T> (T entity) where T: class;
         void Delete<T> (T entity) where T: class;
         Task<bool> SaveAll();
         Task<PagedList<Admin>> GetAdmins(AdminParams adminParams);
         Task<Admin> GetAdmin(int id);
         Task<Photo> GetPhoto(int id);
         Task<Photo> GetMainPhotoForAdmin(int adminId);
    }
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
            return admin == null ? null : admin;
        }

        public async Task<PagedList<Admin>> GetAdmins(AdminParams adminParams)
        {
            var admins = _context.Admins.Include(a => a.Photos).Where(a => a.IsShown == true).AsQueryable();

            if (!string.IsNullOrEmpty(adminParams.Username))
            {
                admins = admins.Where(a => a.Username == adminParams.Username);
            }

            if (!string.IsNullOrEmpty(adminParams.Gender) && adminParams.Gender != "default")
            {
                admins = admins.Where(a => a.Gender == adminParams.Gender);
            }

            if (!string.IsNullOrEmpty(adminParams.OrderBy))
            {
                switch (adminParams.OrderBy)
                {
                    case "created":
                        {
                            if (adminParams.MinCreated != DateTime.MinValue && adminParams.MaxCreated != DateTime.MaxValue)
                            {
                                admins = admins.Where(a => a.Created >= adminParams.MinCreated && a.Created <= adminParams.MaxCreated);
                            }

                            admins = admins.OrderByDescending(a => a.Created);
                            break;
                        }
                    case "lastActive":
                        {
                            admins = admins.OrderByDescending(a => a.LastActive);
                            break;
                        }
                    default: break;
                }
            }

            return await PagedList<Admin>.CreateAsync(admins, adminParams.PageNumber, adminParams.PageSize);
        }

        public async Task<Photo> GetMainPhotoForAdmin(int adminId)
        {
            return await _context.Photos.Where(a => a.AdminId == adminId).FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            return await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}