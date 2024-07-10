import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from './../auth/class/usuario'; // Asegúrate de importar tu modelo de usuario

@Pipe({
  name: 'roleSort'
})
export class RoleSortPipe implements PipeTransform {
  transform(usuarios: Usuario[]): Usuario[] {
    if (!usuarios || usuarios.length === 0) {
      return usuarios; // Devuelve la lista sin cambios si no hay usuarios o está vacía
    }

    // Filtra los usuarios con roles definidos y no nulos
    const usuariosConRoles = usuarios.filter(user => user.role !== undefined && user.role !== null);

    // Ordena los usuarios por rol
    return usuariosConRoles.sort((a, b) => a.role!.localeCompare(b.role!));
  }
}
