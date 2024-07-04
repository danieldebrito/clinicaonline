import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilPacienteComponent } from './perfil-paciente.component';

const routes: Routes = [{ path: '', component: PerfilPacienteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilPacienteRoutingModule { }
