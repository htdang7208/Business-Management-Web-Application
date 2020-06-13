using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bmwa.API.Models
{
    [Table("Interview")]
    public class Interview
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public bool IsShown { get; set; }
        
        // relation:
        [ForeignKey("InterviewId")]
        public ICollection<Student> Students { get; set; }
    }
}