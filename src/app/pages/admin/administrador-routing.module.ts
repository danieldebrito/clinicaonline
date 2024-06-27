import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from './administrador.component';

const routes: Routes = [
  {
    path: '',
    component: AdministradorComponent,
    children: [
      { path: 'usuarios', loadChildren: () => import('./pages/usuarios/usuarios.module').then(m => m.UsuariosModule) },
      { path: 'especialidades', loadChildren: () => import('./../especialidades/especialidades.module').then(m => m.EspecialidadesModule) },
      { path: 'logs', loadChildren: () => import('./pages/logs/logs.module').then(m => m.LogsModule) },
      { path: 'altaadmin', loadChildren: () => import('./../../auth/pages/sign-up-paciente/sign-up.module').then(m => m.SignUpModule) },
    ],
  },
  // { path: 'archivos', component: ArchivosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
