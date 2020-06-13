using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bmwa.API.Models
{
    [Table("Intake")]
    public class Intake
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateBegin { get; set; }
        public DateTime DateEnd { get; set; }
        public int WeekCount { get; set; }
        public bool IsDelete { get; set; }

        // relation:
        public int EduProgId { get; set; }
        public EducationProgram EducationProgram { get; set; }
    }
}