using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ISCManageAPI.Models
{
    [Table("Admin")]
    public class Admin
    {
        [Key]
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public DateTime Dob { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string AvatarLink { get; set; }
        [NotMapped]
        public IFormFile Image { get; set; }
    }
}
