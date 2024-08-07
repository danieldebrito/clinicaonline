import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficoTurnoPorEspecialidadRoutingModule } from './grafico-turno-por-especialidad-routing.module';
import { TurnosPorEspecialidadComponent } from './grafico-turno-por-especialidad.component';
import { BaseChartDirective } from 'ng2-charts';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { DirectivesModule } from '../../../../directives/directives.module';

@NgModule({
  providers: [provideCharts(withDefaultRegisterables())],
  declarations: [
    TurnosPorEspecialidadComponent
  ],
  imports: [
    CommonModule,
    GraficoTurnoPorEspecialidadRoutingModule,
    BaseChartDirective,
    DirectivesModule 
  ]
})
export class GraficoTurnoPorEspecialidadModule { }
