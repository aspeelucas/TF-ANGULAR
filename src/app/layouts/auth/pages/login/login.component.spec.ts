import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Mock, MockProvider } from 'ng-mocks';
import { AuthService } from '../../auth.services';
import { SharedModule } from '../../../../shared/shared.module';
import { Validators } from '@angular/forms';

describe('Prueba de login component', () => {
  let component: LoginComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModule],
      providers: [MockProvider(AuthService)],
    });

    component = TestBed.createComponent(LoginComponent).componentInstance;
  });

  it('El loginComponent debe instanciarse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('El email debe ser requerido', () => {
    expect(
      component.loginForm.get('email')?.hasValidator(Validators.required)
    ).toBeTrue();
  });

  it('La contraseña debe ser requerida', () => {
    expect(
      component.loginForm.get('password')?.hasValidator(Validators.required)
    ).toBeTrue();
  });

  it('Si el formulario es invalido y al llamar submit este debe marcar sus campos como touched', () => {
    // component.loginForm.markAsTouched();
    component.loginForm.patchValue({
      email: '',
      password: '',
    });
    expect(component.loginForm.invalid).toBeTrue();

    const spyOnMarkAsTouched = spyOn(component.loginForm, 'markAllAsTouched');
    component.onSubmit();
    expect(spyOnMarkAsTouched).toHaveBeenCalled();
  });

   
    it('Si el formulario es valido y al llamar submit este no debe marcar sus campos como touched', () => {
        component.loginForm.patchValue({
            email: 'testemailll@gmail',
            password: 'testtt'
        });
        expect(component.loginForm.valid).toBeTrue();

        const spyOnMarkAsTouched = spyOn(component.loginForm, 'markAllAsTouched');
        component.onSubmit();
        expect(spyOnMarkAsTouched).not.toHaveBeenCalled();

    });




});
