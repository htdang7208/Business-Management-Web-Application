using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bmwa.API.Models
{
    [Table("EducationProgram")]
    public class EducationProgram
    {
       public int Id { get; set; } 
       [StringLength(255)]
       public string Name { get; set; }
       public bool IsDelete { get; set; }
       public Intake Intake { get; set; }
        public ICollection<SubjectProgram> SubjectPrograms { get; set; }
    }
}