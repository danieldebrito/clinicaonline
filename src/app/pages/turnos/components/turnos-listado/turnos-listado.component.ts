import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Turno } from '../../../../class/turno';

@Component({
  selector: 'app-turnos-listado',
  templateUrl: './turnos-listado.component.html',
  styleUrls: ['./turnos-listado.component.scss'],
})
export class TurnosListadoComponent {
deleteUsuario(_t23: Turno) {
throw new Error('Method not implemented.');
}
  @Input() turnos: Turno[] = [];
  @Output() throwTurnoSeleccionado = new EventEmitter();

  public lanzarTurno(turno: any) {
    this.throwTurnoSeleccionado.emit(turno);
    console.log(turno);
  }
}
