import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../auth/class/usuario';

@Pipe({
  name: 'tituloMedicoSexo',
})
export class TituloMedicoSexoPipe implements PipeTransform {
  transform(value: Usuario): any {
    if (value.sexo) {
      let ret = '';

      if (value.role == 'especialista') {
        switch (value.sexo.toLocaleUpperCase()) {
          case 'M':
            ret = 'Dr. ';
            break;
          case 'F':
            ret = 'Dra. ';
            break;
          default:
            ret = 'Dre. ';
            break;
        }
      } else {
        switch (value.sexo.toLocaleUpperCase()) {
          case 'M':
            ret = 'Sr. ';
            break;
          case 'F':
            ret = 'Sra. ';
            break;
          default:
            ret = 'Sre. ';
            break;
        }
      }
      return ret;
    }
  }
}
