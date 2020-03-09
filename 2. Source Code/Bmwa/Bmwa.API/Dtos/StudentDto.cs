using System;

namespace Bmwa.API.Dtos
{
    public class StudentDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public DateTime RegisterDate { get; set; }
        public bool Passed { get; set; }
        public string Remark { get; set; }
    }
}