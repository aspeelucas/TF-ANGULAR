import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'hiddenPassword',
})
export class HiddenPasswordPipe implements PipeTransform {
  transform(value: string, isAdmin: boolean): string {
    return isAdmin? value : value.replace(/./g, '*');
  }
}
