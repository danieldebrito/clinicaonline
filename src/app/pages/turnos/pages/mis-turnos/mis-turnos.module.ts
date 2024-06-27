import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisTurnosRoutingModule } from './mis-turnos-routing.module';
import { MisTurnosComponent } from './mis-turnos.component';
import { TurnosComponentsModule } from '../../components/turnos-components.module';

@NgModule({
  declarations: [
    MisTurnosComponent
  ],
  imports: [
    CommonModule,
    MisTurnosRoutingModule,
    TurnosComponentsModule
  ]
})
export class MisTurnosModule { }
