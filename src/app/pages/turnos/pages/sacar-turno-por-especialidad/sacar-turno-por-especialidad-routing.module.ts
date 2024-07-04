import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SacarTurnoPorEspecialidadComponent } from './sacar-turno-por-especialidad.component';

const routes: Routes = [{ path: '', component: SacarTurnoPorEspecialidadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SacarTurnoPorEspecialidadRoutingModule { }
