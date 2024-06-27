import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Especialidad } from '../../../../class/especialidad';


@Component({
  selector: 'app-especialidades-item',
  templateUrl: './especialidades-item.component.html',
  styleUrls: ['./especialidades-item.component.scss']
})
export class EspecialidadesItemComponent {

  @Input() especialidad: any = '';
  @Output() especialidadSeleccionada = new EventEmitter();

  public lanzraEspecialidad(especialidad: Especialidad) {
    this.especialidadSeleccionada.emit(especialidad);
  }

}
