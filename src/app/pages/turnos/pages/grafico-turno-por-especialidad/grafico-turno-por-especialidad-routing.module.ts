import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurnosPorEspecialidadComponent } from './grafico-turno-por-especialidad.component';

const routes: Routes = [{ path: '', component: TurnosPorEspecialidadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraficoTurnoPorEspecialidadRoutingModule { }
