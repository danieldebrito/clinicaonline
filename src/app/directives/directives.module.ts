import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCatchaDirective } from './my-captcha.directive';
import { HoverCardDirective } from './hover-card.directive';
import { TurnoCanceladoBackGroundDirective } from './turno-cancelado-back-ground.directive';

import { MyCatchaSumaDirective } from './my-captcha-suma.directive';
import { SpinnerDirective } from './spinner.directive';
import { TooltipDirective } from './toltip.directive';

@NgModule({
  declarations: [
    MyCatchaDirective,
    HoverCardDirective,
    MyCatchaSumaDirective,
    TurnoCanceladoBackGroundDirective,
    SpinnerDirective,
    TooltipDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MyCatchaDirective,
    HoverCardDirective,
    MyCatchaSumaDirective,
    TurnoCanceladoBackGroundDirective,
    SpinnerDirective,
    TooltipDirective
  ]
})
export class DirectivesModule { }
