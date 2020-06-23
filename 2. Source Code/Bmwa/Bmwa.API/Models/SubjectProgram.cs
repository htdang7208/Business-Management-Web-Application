using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bmwa.API.Models
{
    [Table("SubjectProgram")]
    public class SubjectProgram
    {
        public int Id { get; set; }
        public int SubjectId { get; set; }
        public int EduProgId { get; set; }
        public Subject Subject { get; set; }
        public EducationProgram EducationProgram { get; set; }
    }
}