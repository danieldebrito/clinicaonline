import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCatchaDirective } from './my-captcha.directive';
import { HoverCardDirective } from './hover-card.directive';
import { TurnoCanceladoBackGroundDirective } from './turno-cancelado-back-ground.directive';

import { MyCatchaSumaDirective } from './my-captcha-suma.directive';
import { TurnoAceptadoBackGroundDirective } from './turno-aceptado-back-ground.directive';

@NgModule({
  declarations: [
    MyCatchaDirective,
    HoverCardDirective,
    MyCatchaSumaDirective,
    TurnoCanceladoBackGroundDirective,
    TurnoAceptadoBackGroundDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MyCatchaDirective,
    MyCatchaSumaDirective,
    HoverCardDirective,
    TurnoCanceladoBackGroundDirective,
    TurnoAceptadoBackGroundDirective
  ]
})
export class DirectivesModule { }
