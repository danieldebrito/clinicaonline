import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpEspecialistaRoutingModule } from './sign-up-especialista-routing.module';
import { SignUpEspecialistaComponent } from './sign-up-especialista.component';
import { DirectivesModule } from '../../../directives/directives.module';


@NgModule({
  declarations: [
    SignUpEspecialistaComponent
  ],
  imports: [
    CommonModule,
    SignUpEspecialistaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule
  ]
})
export class SignUpEspecialistaModule { }
