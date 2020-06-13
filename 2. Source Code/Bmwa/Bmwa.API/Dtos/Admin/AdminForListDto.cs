using System;

namespace Bmwa.API.Dtos.Admin
{
    public class AdminForListDto
    {
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
        public string PhotoUrl { get; set; }
    }
}