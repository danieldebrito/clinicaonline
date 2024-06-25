import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../auth/class/usuario';

@Pipe({
  name: 'nombreApellidoPipe',
})
export class NombreApellidoPipe implements PipeTransform {
  transform(value: Usuario): string {
    if (value.nombre && value.apellido) {
      const nombre = this.capitalizeWords(value.nombre);
      const apellido = this.capitalizeFirstLetter(value.apellido);
      return `${nombre} ${apellido}`;
    }
    return '';
  }

  private capitalizeFirstLetter(word: string): string {
    if (!word) {
      return ''; // o puedes manejar esto según tus necesidades
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  private capitalizeWords(text: string): string {
    if (!text) {
      return '';
    }
    return text.replace(/\w\S*/g, word => word.charAt(0).toUpperCase() + word.slice(1));
  }
}
