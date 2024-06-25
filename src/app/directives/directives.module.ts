import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCatchaDirective } from './my-captcha.directive';
import { HoverCardDirective } from './hover-card.directive';
import { TurnoCanceladoBackGroundDirective } from './turno-cancelado-back-ground.directive';

@NgModule({
  declarations: [
    MyCatchaDirective,
    HoverCardDirective,
    TurnoCanceladoBackGroundDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MyCatchaDirective,
    HoverCardDirective,
    TurnoCanceladoBackGroundDirective
  ]
})
export class DirectivesModule { }
