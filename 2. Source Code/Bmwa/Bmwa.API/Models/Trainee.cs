using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace Bmwa.API.Models
{
    [Table("Trainee")]
    public class Trainee
    {
        [Key]
        public int Id { get; set; }
        [StringLength(255)]
        public string Name { get; set; }
        [StringLength(20)]
        public string Gender { get; set; }
        public DateTime Dob { get; set; }
        [StringLength(20)]
        public string Phone { get; set; }
        [StringLength(255)]
        public string Email { get; set; }
        public string Password { get; set; }
        [StringLength(255)]
        public string Address { get; set; }
        [StringLength(20)]
        public string IdentityNumber { get; set; }
        public string PhotoUrl { get; set; }
        [StringLength(100)]
        public string PhotoPublicId { get; set; }
        [NotMapped]
        public IFormFile Photo { get; set; }
        public bool Certification { get; set; }
        public bool Deposit { get; set; }
        public bool IsDelete { get; set; }

        // relation:
        public int IntakeId { get; set; }
        public int UniversityId { get; set; }
        public University University { get; set; }
        [ForeignKey("CompanyId")]
        public ICollection<WorkTrack> WorkTracks { get; set; }
    }
}