using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ISCManageAPI.Utils
{
    public class Helper
    {
        public readonly static string OAuthKey = "ce9b26c912f9f06df1f3bf084fd1c414"; // dangthanh110071 - hash MD5
        public static string Gethash(string input)
        {
            return string.Join("", new SHA1Managed().ComputeHash(Encoding.UTF8.GetBytes(input))
                .Select(x => x.ToString("X2")).ToArray());
        }
    }
}
