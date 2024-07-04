import { Directive, ElementRef, Input } from '@angular/core';
import { EEstadoTurno, Turno } from '../class/turno';

@Directive({
  selector: '[appTurnoAceptado]',
})
export class TurnoAceptadoBackGroundDirective {
  @Input() appTurnoCancelado: Turno = {};

  constructor(private refElement: ElementRef) {}

  private getBackgroundColor() {
    let color: string = 'rgb(197, 188, 188)'; //grisado

    if (this.appTurnoCancelado.estado == EEstadoTurno.aceptado) {
      color = '#39afd3';  //azul celestito
    }

    return color;
  }

  ngOnInit(): void {
    this.refElement.nativeElement.style.backgroundColor =
      this.getBackgroundColor();
  }
}
