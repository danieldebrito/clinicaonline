import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpSelectorRoutingModule } from './sign-up-selector-routing.module';
import { SignUpSelectorComponent } from './sign-up-selector.component';


@NgModule({
  declarations: [
    SignUpSelectorComponent
  ],
  imports: [
    CommonModule,
    SignUpSelectorRoutingModule
  ]
})
export class SignUpSelectorModule { }
