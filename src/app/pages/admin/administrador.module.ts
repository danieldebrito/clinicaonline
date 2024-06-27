import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { AdministradorComponent } from './administrador.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { UsuariosModule } from './pages/usuarios/usuarios.module';


@NgModule({
  declarations: [
    AdministradorComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    UsuariosModule
  ]
})
export class AdministradorModule { }
