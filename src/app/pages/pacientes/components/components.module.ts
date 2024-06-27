import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteCardComponent } from './paciente-card/paciente-card.component';
import { PacientesGridComponent } from './pacientes-grid/pacientes-grid.component';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    PacienteCardComponent,
    PacientesGridComponent
  ],
  imports: [
    CommonModule,
    PipesModule
  ],
  exports: [
    PacienteCardComponent,
    PacientesGridComponent
  ]
})
export class ComponentsModule { }
