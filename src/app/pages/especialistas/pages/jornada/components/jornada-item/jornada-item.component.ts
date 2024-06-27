import { Component, Input } from '@angular/core';
import { Jornada } from '../../../../../../class/jornada';

@Component({
  selector: 'app-jornada-item',
  templateUrl: './jornada-item.component.html',
  styleUrls: ['./jornada-item.component.scss']
})
export class JornadaItemComponent {

  @Input() jornada: Jornada = {};

}
