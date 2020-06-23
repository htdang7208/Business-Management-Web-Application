using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bmwa.API.Models
{
    [Table("Subject")]
    public class Subject
    {
        public int Id { get; set; }
        [StringLength(255)]
        public string Name { get; set; }
        public double MinScore { get; set; }
        [StringLength(20)]
        public string Code { get; set; }
        public int HoursCount { get; set; }
        public int MinutesCount { get; set; }
        public int LessonCount { get; set; }
        public bool IsDelete { get; set; }
        public ICollection<SubjectProgram> SubjectPrograms { get; set; }
    }
}