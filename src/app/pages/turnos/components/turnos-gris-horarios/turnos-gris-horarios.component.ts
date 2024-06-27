import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Turno } from '../../../../class/turno';

@Component({
  selector: 'app-turnos-gris-horarios',
  templateUrl: './turnos-gris-horarios.component.html',
  styleUrls: ['./turnos-gris-horarios.component.scss']
})
export class TurnosGrisHorariosComponent {
  @Input() turnos: Turno[] = [];
  @Output() throwTurnoSeleccionado = new EventEmitter();

  public lanzarTurno(turno: any) {
    this.throwTurnoSeleccionado.emit(turno);
  }
}
