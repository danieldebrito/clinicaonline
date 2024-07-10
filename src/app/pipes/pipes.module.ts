import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloMedicoSexoPipe } from './titulo-medico-sexo.pipe';
import { NombreApellidoPipe } from './nombreApellido.pipe';
import { RoleSortPipe } from './role-sort.pipe';

@NgModule({
  declarations: [TituloMedicoSexoPipe, NombreApellidoPipe, RoleSortPipe],
  imports: [CommonModule],
  exports: [TituloMedicoSexoPipe, NombreApellidoPipe, RoleSortPipe],
})
export class PipesModule {}
