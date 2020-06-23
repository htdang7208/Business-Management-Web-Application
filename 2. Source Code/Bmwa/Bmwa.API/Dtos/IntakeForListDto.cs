using System;
using Bmwa.API.Models;

namespace Bmwa.API.Dtos
{
    public class IntakeForListDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateBegin { get; set; }
        public DateTime DateEnd { get; set; }
        public int WeekCount { get; set; }
        public bool IsDelete { get; set; }
        public EducationProgram EducationProgram{ get; set; }
    }
}