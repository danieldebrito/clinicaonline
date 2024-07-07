import { Component, OnInit, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Turno } from '../../../../class/turno';
import { turnosService } from '../../../../services/turnos.service';

@Component({
  selector: 'app-turnos-por-dia',
  templateUrl: './grafico-turno-por-dia.component.html',
  styleUrls: ['./grafico-turno-por-dia.component.scss'],
})
export class GraficoTurnoPorDiaComponent implements OnInit {
  @Input() turnos: Turno[] = [];
  dias: string[] = [];
  cantidadTurnosPorDia: { [dia: string]: number } = {};

  constructor(private turnoService: turnosService) {
    Chart.register(...registerables);
  }

  cargarDatos(): void {
    this.turnoService.getItems().subscribe(res => {
      this.turnos = res;
      console.log(this.turnos);
      this.procesarTurnos();
      this.generarGrafico();
    });
  }

  procesarTurnos(): void {
    this.cantidadTurnosPorDia = {};

    this.turnos.forEach(turno => {
      if (turno.dia && turno.fecha) {
        // Crear una cadena que incluya el día de la semana y la fecha

        const dia = turno.fechaHora?.dia;
        const mes = turno.fechaHora?.mes;
        const ano = turno.fechaHora?.year;

        const fecha = ano + '/' + mes + '/' + dia;

        const diaYFecha = `${fecha}`;

        if (!this.cantidadTurnosPorDia[diaYFecha]) {
          this.cantidadTurnosPorDia[diaYFecha] = 0;
        }

        this.cantidadTurnosPorDia[diaYFecha]++;
      }
    });

  // Ordenar this.cantidadTurnosPorDia alfabéticamente
  const turnosArray = Object.entries(this.cantidadTurnosPorDia);
  turnosArray.sort((a, b) => a[0].localeCompare(b[0]));
  this.cantidadTurnosPorDia = Object.fromEntries(turnosArray);

  // Actualizar this.dias (opcional)
  this.dias = Object.keys(this.cantidadTurnosPorDia);

  console.table(this.cantidadTurnosPorDia);
  }

  generarGrafico(): void {
    const ctx = document.getElementById('turnosPorDiaChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.dias,
        datasets: [{
          label: 'Cantidad de turnos',
          data: Object.values(this.cantidadTurnosPorDia),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  ngOnInit(): void {
    this.cargarDatos();
  }
}
