import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GraficoTurnoPorMedicoRoutingModule } from './grafico-turno-por-medico-routing.module';
import { GraficoTurnoPorMedicoComponent } from './grafico-turno-por-medico.component';


@NgModule({
  declarations: [
    GraficoTurnoPorMedicoComponent
  ],
  imports: [
    CommonModule,
    GraficoTurnoPorMedicoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GraficoTurnoPorMedicoModule { }
