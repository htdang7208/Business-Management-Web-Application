import { EducationProgram } from './education-program';

export interface Intake {
    id: number;
    name: string;
    dateBegin: Date;
    dateEnd: Date;
    weekCount: number;
    educationProgram: EducationProgram;
    isDelete: boolean;
}
