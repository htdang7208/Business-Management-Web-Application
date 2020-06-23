using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bmwa.API.Models
{
    [Table("Lecturer")]
    public class Lecturer
    {
        public int Id { get; set; }
        [StringLength(255)]
        public string Name { get; set; }
        [StringLength(20)]
        public string Phone { get; set; }
        [StringLength(255)]
        public string Email { get; set; }
        public string PhotoUrl { get; set; }
        public string PhotoPublicId { get; set; }
        public bool IsDelete { get; set; }
    }
}