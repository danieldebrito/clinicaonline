import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpEspecialistaComponent } from './sign-up-especialista.component';

const routes: Routes = [{ path: '', component: SignUpEspecialistaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpEspecialistaRoutingModule { }
