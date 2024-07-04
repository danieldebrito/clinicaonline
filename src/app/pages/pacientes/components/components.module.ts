import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteCardComponent } from './paciente-card/paciente-card.component';
import { PacientesGridComponent } from './pacientes-grid/pacientes-grid.component';
import { PipesModule } from '../../../pipes/pipes.module';
import { PacienteFichaComponent } from './paciente-ficha/paciente-ficha.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PacienteCardComponent,
    PacientesGridComponent,
    PacienteFichaComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule
  ],
  exports: [
    PacienteCardComponent,
    PacientesGridComponent,
    PacienteFichaComponent
  ]
})
export class ComponentsModule { }
