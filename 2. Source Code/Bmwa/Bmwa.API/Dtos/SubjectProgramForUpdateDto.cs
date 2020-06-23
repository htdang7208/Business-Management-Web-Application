using System.Collections.Generic;
using Bmwa.API.Models;

namespace Bmwa.API.Dtos
{
    public class SubjectProgramForUpdateDto
    {
        public EducationProgram EducationProgram { get; set; }
        public List<SubjectProgram> SubjectPrograms { get; set; }
    }
}