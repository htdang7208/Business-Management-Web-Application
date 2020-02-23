using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Bmwa.API.Utils
{
    public class Helper
    {
        public static string Genhash(string input)
        {
            return string.Join("", new SHA512Managed().ComputeHash(Encoding.UTF8.GetBytes(input))
                .Select(x => x.ToString("x2")).ToArray());
        }
    }
}