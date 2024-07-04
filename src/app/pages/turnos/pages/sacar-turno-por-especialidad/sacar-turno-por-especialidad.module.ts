import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SacarTurnoPorEspecialidadRoutingModule } from './sacar-turno-por-especialidad-routing.module';
import { SacarTurnoPorEspecialidadComponent } from './sacar-turno-por-especialidad.component';

import { TurnosComponentsModule } from '../../components/turnos-components.module';
import { EspecialidadesModule } from '../../../especialidades/especialidades.module';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EspecialistaComponentsModule } from '../../../especialistas/components/especialista-components.module';


@NgModule({
  declarations: [
    SacarTurnoPorEspecialidadComponent
  ],
  imports: [
    CommonModule,
    SacarTurnoPorEspecialidadRoutingModule,
    EspecialistaComponentsModule,
    EspecialidadesModule,
    TurnosComponentsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SacarTurnoPorEspecialidadModule { }
