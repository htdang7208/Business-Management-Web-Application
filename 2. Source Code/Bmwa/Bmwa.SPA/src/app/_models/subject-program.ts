import { EducationProgram } from './education-program';
import { Subject } from './subject';
export class SubjectProgram {
    eduProgId: number;
    subjectId: number;
}

export class SucjectProgramForAdd {
    educationProgram: EducationProgram;
    subjectIDList: number[];
}

export class SucjectProgramForUpdate {
    educationProgram: EducationProgram;
    subjects: Subject[];
}
