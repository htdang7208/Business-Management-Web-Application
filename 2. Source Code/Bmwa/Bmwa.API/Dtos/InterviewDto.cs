using System;
using System.Collections.Generic;

namespace Bmwa.API.Dtos
{
    public class InterviewDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public ICollection<StudentDto> Students { get; set; }
    }
}