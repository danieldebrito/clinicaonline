import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisPacientesRoutingModule } from './mis-pacientes-routing.module';
import { MisPacientesComponent } from './mis-pacientes.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TurnosComponentsModule } from '../../../turnos/components/turnos-components.module';
import { ComponentsModule } from '../../../pacientes/components/components.module';
import { PipesModule } from '../../../../pipes/pipes.module';


@NgModule({
  declarations: [
    MisPacientesComponent
  ],
  imports: [
    CommonModule,
    MisPacientesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TurnosComponentsModule,
    ComponentsModule,
    PipesModule
  ]
})
export class MisPacientesModule { }
