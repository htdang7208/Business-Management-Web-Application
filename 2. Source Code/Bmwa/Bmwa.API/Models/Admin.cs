using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bmwa.API.Models
{
    [Table("Admin")]
    public class Admin
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool IsShown { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Gender { get; set; }

        // relation:
        [ForeignKey("AdminId")]
        public ICollection<Photo> Photos { get; set; }
    }
}
