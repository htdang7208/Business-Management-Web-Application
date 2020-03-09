using System;

namespace Bmwa.API.Dtos
{
    public class AdminForListDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhotoURL { get; set; }
    }
}