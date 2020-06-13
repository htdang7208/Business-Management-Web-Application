using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using Bmwa.API.Models;

namespace Bmwa.API.Utils
{
    public class Helper
    {
        private static int day = 0;
        private static int month = 0;
        private static int year = 0;
        private static int totalDays = 0;
        private static int[] daysRemainInMonth = null;

        private static void UpdateLeapYear(int year)
        {
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
                daysRemainInMonth[2] = 29;
            else
                daysRemainInMonth[2] = 28;
        }
        public static DateTime FindDateEnd(Intake intake)
        {
            month = intake.DateBegin.Month;
            year = intake.DateBegin.Year;
            totalDays = intake.WeekCount * 7;
            daysRemainInMonth = new int[] { 0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };

            UpdateLeapYear(year);
            // Update day remain in first month
            daysRemainInMonth[month] = daysRemainInMonth[month] - intake.DateBegin.Day + 1;
            // start finding
            totalDays = totalDays - daysRemainInMonth[month];
            do
            {
                day = totalDays;
                month++;

                if (month > 12)
                {
                    month = 1;
                    year++;
                    UpdateLeapYear(year);
                }

                totalDays = totalDays - daysRemainInMonth[month];
            } while (totalDays > 0);

            return new DateTime(year, month, day);
        }
        public static string Genhash(string input)
        {
            return string.Join("", new SHA512Managed().ComputeHash(Encoding.UTF8.GetBytes(input))
                .Select(x => x.ToString("x2")).ToArray());
        }
    }
}