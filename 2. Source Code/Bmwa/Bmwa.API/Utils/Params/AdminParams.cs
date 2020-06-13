using System;

namespace Bmwa.API.Utils.Params
{
    public class AdminParams : Params
    {        
        public string Gender { get; set; }
        public string Username { get; set; }
        public DateTime MinCreated { get; set; } = DateTime.MinValue;
        public DateTime MaxCreated { get; set; } = DateTime.MaxValue;
        public string OrderBy { get; set; }
    }
}