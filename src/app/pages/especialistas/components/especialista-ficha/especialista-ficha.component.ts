import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Especialista } from '../../../../class/usuarios/especialista';

@Component({
  selector: 'app-especialista-ficha',
  templateUrl: './especialista-ficha.component.html',
  styleUrl: './especialista-ficha.component.scss'
})
export class EspecialistaFichaComponent implements OnInit {
  
  @Input() especialista: Especialista | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Lógica adicional si es necesario
  }

  volver(): void {
    this.router.navigate(['/previous-page']);  // Cambia '/previous-page' a la ruta correspondiente
  }
}
