import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Especialidad } from '../../../../class/especialidad';

@Component({
  selector: 'app-especialidades-grid',
  templateUrl: './especialidades-grid.component.html',
  styleUrls: ['./especialidades-grid.component.scss']
})
export class EspecialidadesGridComponent {

  @Input() especialidades: Especialidad[] = [];
  @Output() especialidadSeleccionada = new EventEmitter();

  public lanzarEspecialidad(especialidad: any) {
    this.especialidadSeleccionada.emit(especialidad);
  }

}
