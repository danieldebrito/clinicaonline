import { Component, Input } from '@angular/core';
import { Paciente } from '../../../../class/usuarios/paciente';

@Component({
  selector: 'app-pacientes-grid',
  templateUrl: './pacientes-grid.component.html',
  styleUrls: ['./pacientes-grid.component.scss']
})
export class PacientesGridComponent {

  @Input() pacientes: Paciente[] = [];

}
