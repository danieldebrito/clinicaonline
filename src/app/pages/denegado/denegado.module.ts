import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DenegadoRoutingModule } from './denegado-routing.module';
import { DenegadoComponent } from './denegado.component';


@NgModule({
  declarations: [
    DenegadoComponent
  ],
  imports: [
    CommonModule,
    DenegadoRoutingModule
  ]
})
export class DenegadoModule { }
