import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilPacienteRoutingModule } from './perfil-paciente-routing.module';
import { PerfilPacienteComponent } from './perfil-paciente.component';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PerfilPacienteComponent
  ],
  imports: [
    CommonModule,
    PerfilPacienteRoutingModule,
    ComponentsModule
  ]
})
export class PerfilPacienteModule { }
