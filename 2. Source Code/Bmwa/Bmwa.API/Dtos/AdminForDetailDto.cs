using System.Collections.Generic;

namespace Bmwa.API.Dtos
{
    public class AdminForDetailDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhotoURL { get; set; }
        public ICollection<PhotoForDetailDto> Photos { get; set; }
    }
}