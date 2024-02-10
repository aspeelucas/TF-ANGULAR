import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'validationErrors',
})
export class ValidationErrorsPipe implements PipeTransform {
  transform(errors?: ValidationErrors | null, ...args: unknown[]): unknown {
    console.log(errors);
    if (!!errors) {
      let messages = [];
      if (errors['required']) messages.push('Campo Requerido');
      if (errors['email']) messages.push('El email no es valido');
      if (errors['minlength'])
        messages.push(
          `El minimo de caracteres es ${errors['minlength'].requiredLength}`
        );

      return messages.join('. ') + '.';
    }

    return null;
  }
}
