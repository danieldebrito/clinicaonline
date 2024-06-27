import { Component, Input } from '@angular/core';
import { Turno } from '../../../../class/turno';

@Component({
  selector: 'app-turno-card',
  templateUrl: './turno-card.component.html',
  styleUrls: ['./turno-card.component.scss']
})
export class TurnoCardComponent {

  @Input() turno: Turno = {};

}
