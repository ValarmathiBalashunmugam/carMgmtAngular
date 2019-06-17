import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'authPipe'
})
export class AuthPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
