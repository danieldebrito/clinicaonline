import { Directive, ElementRef, Input } from '@angular/core';
import { EEstadoTurno, Turno } from '../class/turno';

@Directive({
  selector: '[appTurnoCancelado]',
})
export class TurnoCanceladoBackGroundDirective {
  @Input() appTurnoCancelado: Turno = {};

  constructor(private refElement: ElementRef) {}

  private getBackgroundColor() {
    let color: string = 'rgb(197, 188, 188)'; //grisado

    if (this.appTurnoCancelado.estado == EEstadoTurno.cancelado) {
      color = 'rgb(250, 149, 149)';
    }

    return color;
  }

  ngOnInit(): void {
    this.refElement.nativeElement.style.backgroundColor =
      this.getBackgroundColor();
  }
}
