import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Especialidad } from '../../../../class/especialidad';

@Component({
  selector: 'app-especialidades-list',
  templateUrl: './especialidades-list.component.html',
  styleUrls: ['./especialidades-list.component.scss']
})
export class EspecialidadesListComponent {

  @Input() especialidades: Especialidad[] = [];
  @Output() especialidadSeleccionada = new EventEmitter();

  public lanzarEspecialidad(especialidad: Especialidad){
    this.especialidadSeleccionada.emit(especialidad);
  }

}
