using System;

namespace Bmwa.API.Dtos.Admin
{
    public class AdminForUpdateProfileDto
    {
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
    }
}