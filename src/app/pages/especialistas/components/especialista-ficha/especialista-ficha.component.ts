import { Component, Input } from '@angular/core';
import { Especialista } from '../../../../class/usuarios/especialista';

@Component({
  selector: 'app-especialista-ficha',
  templateUrl: './especialista-ficha.component.html',
  styleUrl: './especialista-ficha.component.scss'
})
export class EspecialistaFichaComponent {
  
  @Input() especialista: Especialista | undefined = {};


}
