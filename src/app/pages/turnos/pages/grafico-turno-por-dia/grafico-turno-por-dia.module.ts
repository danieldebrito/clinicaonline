import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficoTurnoPorDiaRoutingModule } from './grafico-turno-por-dia-routing.module';
import { GraficoTurnoPorDiaComponent } from './grafico-turno-por-dia.component';
import { DirectivesModule } from '../../../../directives/directives.module';


@NgModule({
  declarations: [
    GraficoTurnoPorDiaComponent
  ],
  imports: [
    CommonModule,
    GraficoTurnoPorDiaRoutingModule,
    DirectivesModule
  ]
})
export class GraficoTurnoPorDiaModule { }
