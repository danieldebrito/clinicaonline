import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtenderTurnoRoutingModule } from './atender-turno-routing.module';
import { AtenderTurnoComponent } from './atender-turno.component';
import { TurnosComponentsModule } from './../../../../pages/turnos/components/turnos-components.module';
import { EspecialistaComponentsModule } from '../../components/especialista-components.module';
import { EspecialidadesModule } from '../../../especialidades/especialidades.module';


@NgModule({
  declarations: [
    AtenderTurnoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AtenderTurnoRoutingModule,
    TurnosComponentsModule,
    EspecialistaComponentsModule,
    EspecialidadesModule
  ]
})
export class AtenderTurnoModule { }
