import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Turno } from '../../../../class/turno';

@Component({
  selector: 'app-turno-detalle',
  templateUrl: './turno-detalle.component.html',
  styleUrls: ['./turno-detalle.component.scss'],
})
export class TurnoDetalleComponent {
  @Input() turno: Turno = {};

  @Output() thowTurno = new EventEmitter();



  public lanzaTurno() {
    this.thowTurno.emit(this.turno);
  }
}
