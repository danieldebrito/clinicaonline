import { Component, Input } from '@angular/core';
import { Paciente } from '../../../../class/usuarios/paciente';

@Component({
  selector: 'app-paciente-ficha',
  templateUrl: './paciente-ficha.component.html',
  styleUrl: './paciente-ficha.component.scss'
})
export class PacienteFichaComponent {
  
  @Input() paciente: Paciente | undefined = {};

}
