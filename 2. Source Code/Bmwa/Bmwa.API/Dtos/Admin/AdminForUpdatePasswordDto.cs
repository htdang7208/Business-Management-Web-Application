namespace Bmwa.API.Dtos.Admin
{
    public class AdminForUpdatePasswordDto
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}