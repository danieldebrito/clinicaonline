import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PacienteGuard } from './guard/paciente.guard';
import { AdminGuard } from './guard/admin.guard';
import { EspecialistaGuard } from './guard/espacialista.guard';
import { AuthGuard } from './guard/auth.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // auth ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  { path: 'sign-in', loadChildren: () => import('./auth/pages/sign-in/sign-in.module').then(m => m.SignInModule) },
  { path: 'forgot-password', loadChildren: () => import('./auth/pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  { path: 'verify-email', loadChildren: () => import('./auth/pages/verify-email/verify-email.module').then(m => m.VerifyEmailModule) },
  { path: 'signup-paciente', loadChildren: () => import('./auth/pages/sign-up-paciente/sign-up.module').then(m => m.SignUpModule) },
  { path: 'signup-especialista', loadChildren: () => import('./auth/pages/sign-up-especialista/sign-up-especialista.module').then(m => m.SignUpEspecialistaModule) },
  { path: 'signup-selector', loadChildren: () => import('./auth/pages/sign-up-selector/sign-up-selector.module').then(m => m.SignUpSelectorModule) },
    // pages ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'denegado', loadChildren: () => import('./pages/denegado/denegado.module').then(m => m.DenegadoModule) },

  { path: 'administrador', loadChildren: () => import('./pages/admin/administrador.module').then(m => m.AdministradorModule), canActivate: [AdminGuard] },
  { path: 'jornadas', loadChildren: () => import('./pages/especialistas/pages/jornada/jornada.module').then(m => m.JornadaModule), canActivate: [EspecialistaGuard] },
  { path: 'misturnos', loadChildren: () => import('./pages/turnos/pages/mis-turnos/mis-turnos.module').then(m => m.MisTurnosModule), canActivate: [AuthGuard]},
  { path: 'sacarturno', loadChildren: () => import('./pages/turnos/pages/sacar-turno/sacar-turno.module').then(m => m.SacarTurnoModule), canActivate: [PacienteGuard] },
  { path: 'especialidades', loadChildren: () => import('./pages/especialidades/especialidades.module').then(m => m.EspecialidadesModule), canActivate: [AdminGuard] },
  { path: 'atenderturno', loadChildren: () => import('./pages/especialistas/pages/atender-turno/atender-turno.module').then(m => m.AtenderTurnoModule) },
  { path: 'mispacientes', loadChildren: () => import('./pages/especialistas/pages/mis-pacientes/mis-pacientes.module').then(m => m.MisPacientesModule) },
  { path: 'historiaclinica', loadChildren: () => import('./pages/historia-clinica/historia-clinica.module').then(m => m.HistoriaClinicaModule) },
  { path: 'perfilpaciente', loadChildren: () => import('./pages/pacientes/pages/perfil-paciente/perfil-paciente.module').then(m => m.PerfilPacienteModule) },
  { path: 'sacarturnoesp', loadChildren: () => import('./pages/turnos/pages/sacar-turno-por-especialidad/sacar-turno-por-especialidad.module').then(m => m.SacarTurnoPorEspecialidadModule) },
  { path: 'graficoturnoespecialidad', loadChildren: () => import('./pages/turnos/pages/grafico-turno-por-especialidad/grafico-turno-por-especialidad.module').then(m => m.GraficoTurnoPorEspecialidadModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }



  /*
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'denegado', loadChildren: () => import('./pages/denegado/denegado.module').then(m => m.DenegadoModule) },
  { path: 'administrador', loadChildren: () => import('./pages/admin/administrador.module').then(m => m.AdministradorModule) },  //, canActivate: [AdminGuard]
  { path: 'misturnos', loadChildren: () => import('./pages/turnos/pages/mis-turnos/mis-turnos.module').then(m => m.MisTurnosModule)},
  { path: 'sacarturno', loadChildren: () => import('./pages/turnos/pages/sacar-turno/sacar-turno.module').then(m => m.SacarTurnoModule) , canActivate: [PacienteGuard]  },
  { path: 'especialidades', loadChildren: () => import('./pages/especialidades/especialidades.module').then(m => m.EspecialidadesModule), canActivate: [AdminGuard] },
  { path: 'jornadas', loadChildren: () => import('./pages/especialistas/pages/jornada/jornada.module').then(m => m.JornadaModule), canActivate: [EspecialistaGuard] },
  { path: 'atenderturno', loadChildren: () => import('./pages/especialistas/pages/atender-turno/atender-turno.module').then(m => m.AtenderTurnoModule) },
  { path: 'historiaclinica', loadChildren: () => import('./pages/historia-clinica/historia-clinica.module').then(m => m.HistoriaClinicaModule) },
  { path: 'mispacientes', loadChildren: () => import('./pages/especialistas/pages/mis-pacientes/mis-pacientes.module').then(m => m.MisPacientesModule) },
  */
