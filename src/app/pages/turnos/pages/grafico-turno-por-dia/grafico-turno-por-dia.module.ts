import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficoTurnoPorDiaRoutingModule } from './grafico-turno-por-dia-routing.module';
import { GraficoTurnoPorDiaComponent } from './grafico-turno-por-dia.component';


@NgModule({
  declarations: [
    GraficoTurnoPorDiaComponent
  ],
  imports: [
    CommonModule,
    GraficoTurnoPorDiaRoutingModule
  ]
})
export class GraficoTurnoPorDiaModule { }
