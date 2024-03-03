import { ICourse } from '../../courses/models/course.model';

import { IStudent } from '../../students/models/student.model';

export interface IInscription {
  id: string | number;
  studentId: string | number;
  courseId: string | number;
  student?: IStudent;
  course?: ICourse;
}

export interface ICreateInscriptionData {
  studentId: string | number | null;
  courseId: string | number | null;
}
