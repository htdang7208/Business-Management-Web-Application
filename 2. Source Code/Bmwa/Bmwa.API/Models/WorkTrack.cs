using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bmwa.API.Models
{
    [Table("WorkTrack")]
    public class WorkTrack
    {
        public int Id { get; set; }
        public DateTime DateBegin { get; set; }
        public DateTime DateEnd { get; set; }
        public bool Alive { get; set; }
        public string Remark { get; set; }
        public bool IsDelete { get; set; }
        
        // relation:
        public int TraineeId { get; set; }
        public int CompanyId { get; set; }
        public Trainee Trainee { get; set; }
        public Company Company { get; set; }
    }
}