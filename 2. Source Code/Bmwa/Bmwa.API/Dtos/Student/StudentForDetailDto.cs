using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace Bmwa.API.Dtos.Student
{
    public class StudentForDetailDto
    {
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
        public IFormFile Photo { get; set; }
    }
}