import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../auth/class/usuario';

@Pipe({
  name: 'tituloMedicoSexo',
})
export class TituloMedicoSexoPipe implements PipeTransform {
  transform(value: Usuario): any {
if(value.sexo){
  let ret = '';
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
  return ret;
}
}
}
