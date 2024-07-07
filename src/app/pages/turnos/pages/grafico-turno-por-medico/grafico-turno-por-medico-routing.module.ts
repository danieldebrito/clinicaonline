import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficoTurnoPorMedicoComponent } from './grafico-turno-por-medico.component';

const routes: Routes = [{ path: '', component: GraficoTurnoPorMedicoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraficoTurnoPorMedicoRoutingModule { }
