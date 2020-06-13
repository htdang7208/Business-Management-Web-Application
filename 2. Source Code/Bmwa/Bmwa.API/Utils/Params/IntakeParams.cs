using System;

namespace Bmwa.API.Utils.Params
{
    public class IntakeParams : Params
    {
        public string Name { get; set; } = null;
        public int WeekCount { get; set; } = 0;
        public DateTime DateBegin { get; set; } = DateTime.MinValue;
        public DateTime DateEnd { get; set; } = DateTime.MinValue;
    }
}