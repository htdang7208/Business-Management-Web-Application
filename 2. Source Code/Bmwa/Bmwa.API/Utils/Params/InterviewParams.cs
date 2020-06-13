using System;

namespace Bmwa.API.Utils.Params
{
    public class InterviewParams : Params
    {
        public string Name { get; set; }
        public DateTime Date { get; set; } = DateTime.MinValue;
    }
}