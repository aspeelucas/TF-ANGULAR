import { TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { MockProvider } from 'ng-mocks';
import { CoursesService } from './courses.service';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

describe('Prueba de courses component', () => {
  let component: CoursesComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesComponent],
      providers: [
        MockProvider(CoursesService, {
          getCourses: () =>
            of([
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
            ]),
        }),
      ],
    });
  });

  it('las columnas de la tabla deben tener estos nombres : "id", "nameCourse", "start", "end", "price", "actions"', () => {
    component = TestBed.createComponent(CoursesComponent).componentInstance;
    expect(component.displayedColumns).toContain('id');
    expect(component.displayedColumns).toContain('nameCourse');
    expect(component.displayedColumns).toContain('start');
    expect(component.displayedColumns).toContain('end');
    expect(component.displayedColumns).toContain('price');
    expect(component.displayedColumns).toContain('actions');
  });
});
