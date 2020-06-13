using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bmwa.API.Models
{
    [Table("Company")]
    public class Company
    {
        [Key]
        public int Id { get; set; }
        [StringLength(255)]
        public string Name { get; set; }
        [StringLength(255)]
        public string Address { get; set; }
        [StringLength(255)]
        public string PersonContact { get; set; }
        [StringLength(20)]
        public string Phone { get; set; }
        [StringLength(255)]
        public string Email { get; set; }
        public bool IsDelete { get; set; }

        [ForeignKey("CompanyId")]
        public ICollection<WorkTrack> WorkTracks { get; set; }
    }
}