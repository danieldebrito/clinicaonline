import { Component, OnInit, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Turno } from '../../../../class/turno';
import { turnosService } from '../../../../services/turnos.service';
import { EspecialidadesService } from '../../../../services/especialidades.service';

@Component({
  selector: 'app-turnos-por-especialidad',
  templateUrl: './grafico-turno-por-especialidad.component.html',
  styleUrls: ['./grafico-turno-por-especialidad.component.scss'],
})
export class TurnosPorEspecialidadComponent implements OnInit {
  @Input() turnos: Turno[] = [];
  especialidades: any[] = [];
  cantidadTurnosPorEspecialidad: { [especialidad: string]: number } = {};

  constructor(
    private turnoService: turnosService,
    private especialidadesService: EspecialidadesService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.turnoService.getItems().subscribe(
      (turnos) => {
        this.turnos = turnos;
        this.especialidadesService.getItems().subscribe(
          (especialidades) => {
            this.especialidades = especialidades.map(especialidad => especialidad.nombre);
            this.procesarTurnos();
            this.generarGrafico();
          },
          (error) => {
            console.error('Error al obtener especialidades:', error);
          }
        );
      },
      (error) => {
        console.error('Error al obtener turnos:', error);
      }
    );
  }

  procesarTurnos(): void {
    this.cantidadTurnosPorEspecialidad = this.especialidades.reduce((acc, especialidad) => {
      acc[especialidad] = 0;
      return acc;
    }, {});

    this.turnos.forEach(turno => {
      const especialidad = turno.especialidad?.nombre ?? '';
      if (especialidad) {
        this.cantidadTurnosPorEspecialidad[especialidad]++;
      }
    });
  }

  generarGrafico(): void {
    const ctx = document.getElementById('turnosPorEspecialidadChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.especialidades,
        datasets: [{
          label: 'Cantidad de turnos',
          data: Object.values(this.cantidadTurnosPorEspecialidad),
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
}
