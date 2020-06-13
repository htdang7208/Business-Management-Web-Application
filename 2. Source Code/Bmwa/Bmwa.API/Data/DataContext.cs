using Bmwa.API.Models;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bmwa.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Interview> Interviews { get; set; }
        public DbSet<Intake> Intakes { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<University> Universities { get; set; }
        public DbSet<Trainee> Trainees { get; set; }
        public DbSet<WorkTrack> WorkTracks { get; set; }
        public DbSet<EducationProgram> EducationPrograms { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<EducationProgram>()
                .HasOne(e => e.Intake)
                .WithOne(i => i.EducationProgram)
                .HasForeignKey<Intake>(i => i.EduProgId);
        }
    }
}
