using System.Collections.Generic;
using Bmwa.API.Models;

namespace Bmwa.API.Dtos
{
    public class SubjectProgramForAddDto
    {
        public EducationProgram EducationProgram { get; set; }
        public List<int> SubjectIDList { get; set; }
    }
}