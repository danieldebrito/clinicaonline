import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Especialidad } from '../../../../class/especialidad';

@Component({
  selector: 'app-especialidades-card',
  templateUrl: './especialidades-card.component.html',
  styleUrls: ['./especialidades-card.component.scss']
})
export class EspecialidadesCardComponent {

  @Input() especialidad: any = {};
  @Output() especialidadSeleccionada = new EventEmitter();

  public lanzraEspecialidad(especialidad: Especialidad) {
    this.especialidadSeleccionada.emit(especialidad);
  }

}
