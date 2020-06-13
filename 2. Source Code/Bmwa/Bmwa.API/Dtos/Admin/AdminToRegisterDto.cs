using System;
using System.ComponentModel.DataAnnotations;

namespace Bmwa.API.Dtos.Admin
{
    public class AdminToRegisterDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Gender { get; set; }
        // Some Default Value
        public bool IsShown { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public AdminToRegisterDto() {
            IsShown = true;
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}