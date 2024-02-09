import { Injectable } from '@angular/core';
import { delay, finalize, of, tap } from 'rxjs';
import { ICourse } from './models/course.model';
import { LoadingService } from '../../../../core/services/loading.service';
import { AlertService } from '../../../../core/services/alert.service';

let courses: ICourse[] = [
  {
    id: 1,
    nameCourse: 'Ingles Basico',
    start: new Date('2021-08-01'),
    end: new Date('2021-08-30'),
    price: 1000,
  },
  {
    id: 2,
    nameCourse: 'Ingles Intermedio',
    start: new Date('2021-08-01'),
    end: new Date('2021-08-30'),
    price: 2000,
  },
  {
    id: 3,
    nameCourse: 'Ingles Avanzado',
    start: new Date('2021-08-01'),
    end: new Date('2021-08-30'),
    price: 5000,
  },
];

@Injectable()
export class CoursesService {

  constructor(
    private loadingServices: LoadingService,
    private alertServices: AlertService
  ) {}

  getCourses() {
    this.loadingServices.setLoading(true);
    return of(courses).pipe(
      delay(1000),
      finalize(() => this.loadingServices.setLoading(false))
    );
  }

  deleteCourseById(id: number) {
    courses = courses.filter((course) => course.id !== id);
    return this.getCourses().pipe(
      tap(() =>
        this.alertServices.showSuccess(
          'Curso eliminado',
          'El curso fue eliminado correctamente'
        )
      )
    );
  }

  createCourse(course: ICourse) {
    courses = [...courses, course];
    return this.getCourses().pipe(
      tap(() =>
        this.alertServices.showSuccess(
          'Curso creado',
          'El curso fue creado correctamente'
        )
      )
    );
  }

  updateCourseById(id: number, data: ICourse) {
    courses = courses.map((course) =>
      course.id === id ? { ...course, ...data } : course
    );
    return this.getCourses().pipe(
      tap(() =>
        this.alertServices.showSuccess(
          'Curso actualizado',
          'El curso fue actualizado correctamente'
        )
      )
    );
  }
}
