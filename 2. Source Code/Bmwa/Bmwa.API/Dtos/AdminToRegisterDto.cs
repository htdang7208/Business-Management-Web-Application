using System.ComponentModel.DataAnnotations;

namespace Bmwa.API.Dtos
{
    public class AdminToRegisterDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify password between 4 and 8 characters")]
        public string Password { get; set; }
        public string ImageUrl { get; set; }
    }
}