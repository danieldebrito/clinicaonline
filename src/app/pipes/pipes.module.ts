import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloMedicoSexoPipe } from './titulo-medico-sexo.pipe';
import { NombreApellidoPipe } from './nombreApellido.pipe';

@NgModule({
  declarations: [TituloMedicoSexoPipe, NombreApellidoPipe],
  imports: [CommonModule],
  exports: [TituloMedicoSexoPipe, NombreApellidoPipe],
})
export class PipesModule {}
