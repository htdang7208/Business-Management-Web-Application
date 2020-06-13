using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace Bmwa.API.Models
{
    [Table("Student")]
    public class Student
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string IdentityNumber { get; set; }
        public TimeSpan InterviewTime { get; set; }
        public int Status { get; set; }
        public string Remark { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public DateTime RegisterDate { get; set; }
        public Boolean IsShown { get; set; }
        public string PhotoUrl { get; set; }
        public string PhotoPublicId { get; set; }
        [NotMapped]
        public IFormFile Photo { get; set; }

        // relation:
        public int InterviewId { get; set; }
        public Interview Interview { get; set; }
    }
}