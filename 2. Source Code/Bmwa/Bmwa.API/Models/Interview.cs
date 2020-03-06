using System;
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
        public bool Passed { get; set; }
        public string Remark { get; set; }
        public int StudentID { get; set; }
        public Student Student { get; set; }
    }
}