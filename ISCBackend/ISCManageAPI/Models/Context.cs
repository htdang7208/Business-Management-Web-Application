using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ISCManageAPI.Models
{
    public class Context: DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {
        }

        public virtual DbSet<Admin> Admins { get; set; }
    }
}
