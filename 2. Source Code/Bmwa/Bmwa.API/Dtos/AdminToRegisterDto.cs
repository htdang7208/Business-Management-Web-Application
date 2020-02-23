namespace Bmwa.API.Dtos
{
    public class AdminToRegisterDto
    {
        public string Name { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string ImageUrl { get; set; }
    }
}