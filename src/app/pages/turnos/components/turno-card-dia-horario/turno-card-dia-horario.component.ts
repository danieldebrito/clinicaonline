import { Component, Input } from '@angular/core';
import { Turno } from '../../../../class/turno';

@Component({
  selector: 'turno-card-dia-horario',
  templateUrl: './turno-card-dia-horario.component.html',
  styleUrls: ['./turno-card-dia-horario.component.scss']
})
export class TurnoCardHorarioComponent {
  @Input() turno: Turno = {};
}
