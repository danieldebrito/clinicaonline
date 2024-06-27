import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SacarTurnoRoutingModule } from './sacar-turno-routing.module';
import { SacarTurnoComponent } from './sacar-turno.component';
import { TurnosComponentsModule } from '../../components/turnos-components.module';
import { EspecialidadesModule } from '../../../especialidades/especialidades.module';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EspecialistaComponentsModule } from '../../../especialistas/components/especialista-components.module';


@NgModule({
  declarations: [
    SacarTurnoComponent
  ],
  imports: [
    CommonModule,
    SacarTurnoRoutingModule,
    TurnosComponentsModule,
    EspecialistaComponentsModule,
    EspecialidadesModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SacarTurnoModule { }
