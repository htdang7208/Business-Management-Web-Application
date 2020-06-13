using System;

namespace Bmwa.API.Utils.Params
{
    public class StudentParams : Params
    {
        public string Name { get; set; }
        public string IdentityNumber { get; set; }
        // Status = 1: passed
        // Status = 0: failed
        // Status = 2: Not attended interview
        public int Status { get; set; } = -1;
        public TimeSpan InterviewTime { get; set; } = TimeSpan.MinValue;
        public int InterviewId { get; set; } = -1;
    }
}