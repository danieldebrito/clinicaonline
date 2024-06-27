import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Especialidad } from '../../../../class/especialidad';

@Component({
  selector: 'app-especialistas-grid',
  templateUrl: './especialistas-grid.component.html',
  styleUrls: ['./especialistas-grid.component.scss']
})
export class EspecialistasGridComponent {

  @Input() especialistas: Especialidad[] = [];
  @Output() especialistaSeleccionado = new EventEmitter();

  public lanzarEspecialista(especialidad: any) {
    this.especialistaSeleccionado.emit(especialidad);
  }

}
