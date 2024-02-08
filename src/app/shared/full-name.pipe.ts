import { Pipe, PipeTransform } from '@angular/core';

function capitalizeFirstLetter(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export interface IUsersPipe { 
  firstName: string;
  lastName: string;
}

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: IUsersPipe, ...args: unknown[]): unknown {
    return `${capitalizeFirstLetter(value.firstName)} ${capitalizeFirstLetter(value.lastName)}`;
  }

}
