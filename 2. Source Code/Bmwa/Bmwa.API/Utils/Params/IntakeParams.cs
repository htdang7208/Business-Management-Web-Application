using System;

namespace Bmwa.API.Utils.Params
{
    public class IntakeParams : Params
    {
        public string Name { get; set; } = null;
        public int WeekAmount { get; set; } = 0;
        public DateTime DateBeginFrom { get; set; } = DateTime.MinValue;
        public DateTime DateBeginTo { get; set; } = DateTime.MinValue;
        public DateTime DateEndFrom { get; set; } = DateTime.MinValue;
        public DateTime DateEndTo { get; set; } = DateTime.MinValue;
    }
}