import { Component, OnInit } from '@angular/core';
import { turnosService } from '../../../../services/turnos.service';
import { Turno } from '../../../../class/turno';

@Component({
  selector: 'app-grafico-turno-por-especialidad',
  templateUrl: './grafico-turno-por-especialidad.component.html',
  styleUrl: './grafico-turno-por-especialidad.component.scss'
})
export class GraficoTurnoPorEspecialidadComponent implements OnInit  {

  public turnos: Turno[] = [];


  constructor(
    private turnosSv: turnosService
  ) {}


  public getTurnos(){
    this.turnosSv.getItems().subscribe( res => {
      this.turnos = res;
    });
  }

  ngOnInit(): void {
    this.getTurnos();
  }
}
