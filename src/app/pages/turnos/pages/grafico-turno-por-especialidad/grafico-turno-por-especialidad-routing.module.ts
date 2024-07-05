import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficoTurnoPorEspecialidadComponent } from './grafico-turno-por-especialidad.component';

const routes: Routes = [{ path: '', component: GraficoTurnoPorEspecialidadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraficoTurnoPorEspecialidadRoutingModule { }
