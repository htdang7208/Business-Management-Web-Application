using System;

namespace Bmwa.API.Dtos.Student
{
    public class StudentForListDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string IdentityNumber { get; set; }
        public TimeSpan InterviewTime { get; set; }
        public int Status { get; set; }
        public string Remark { get; set; }
    }
}