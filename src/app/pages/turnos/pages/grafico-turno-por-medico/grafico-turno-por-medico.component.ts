import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Turno } from '../../../../class/turno';
import { turnosService } from '../../../../services/turnos.service';
import { EspecialidadesService } from '../../../../services/especialidades.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-grafico-turno-por-medico',
  templateUrl: './grafico-turno-por-medico.component.html',
  styleUrls: ['./grafico-turno-por-medico.component.scss'],
})
export class GraficoTurnoPorMedicoComponent implements OnInit, AfterViewInit {
  turnos: Turno[] = [];
  especialidades: any[] = [];
  cantidadTurnosPorMedico: { [key: string]: any } = {};
  chartData: any = [];
  chartInstance: any = null;
  dateRangeForm: FormGroup;
  endDate: string | null = null;

  @ViewChild('turnosPorMedicoChart') turnosPorMedicoChart!: ElementRef<HTMLCanvasElement>;

  constructor(
    private turnoService: turnosService,
    private especialidadesService: EspecialidadesService,
    private fb: FormBuilder
  ) {
    Chart.register(...registerables);

    // Initialize form
    this.dateRangeForm = this.fb.group({
      startDate: [''],
      endDate: ['']
    });
  }

  ngAfterViewInit(): void {
    this.dateRangeForm.valueChanges.subscribe(values => {
      if (values.startDate && values.endDate) {
        this.endDate = values.endDate;
        this.cargarDatos(values.startDate, values.endDate);
      } else {
        this.endDate = null;
      }
    });
  }

  cargarDatos(startDate?: string, endDate?: string): void {
    this.turnoService.getItems().subscribe(
      turnos => {
        this.turnos = turnos;
        if (startDate && endDate) {
          this.turnos = this.turnos.filter(turno => {
            if (turno.fechaHora) {
              const turnoDate = new Date(turno.fechaHora.year ?? 0, (turno.fechaHora.mes ?? 1) - 1, turno.fechaHora.dia ?? 1);
              return turnoDate >= new Date(startDate) && turnoDate <= new Date(endDate);
            }
            return false;
          });
        }
        this.especialidadesService.getItems().subscribe(
          (especialidades) => {
            this.especialidades = especialidades.map(
              (especialidad) => especialidad.nombre
            );
            this.procesarTurnos();
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
    this.cantidadTurnosPorMedico = {};

    this.turnos.forEach((turno) => {
      if (turno.fechaHora && turno.especialista?.nombre && turno.especialista?.apellido) {
        const year = turno.fechaHora.year ?? 0;
        const mes = turno.fechaHora.mes ?? 1; // Default to January if undefined
        const dia = turno.fechaHora.dia ?? 1; // Default to 1st day if undefined
        const fecha = `${year}/${mes}/${dia}`;
        const key = `${turno.especialista.nombre} ${turno.especialista.apellido} - ${fecha}`;

        if (!this.cantidadTurnosPorMedico[key]) {
          this.cantidadTurnosPorMedico[key] = 0;
        }

        this.cantidadTurnosPorMedico[key]++;
      }
    });

    // Agrupar datos por médico (opcional)
    this.cantidadTurnosPorMedico = this.groupDataByDoctor(this.cantidadTurnosPorMedico);
    console.log('Cantidad de Turnos por Medico:', this.cantidadTurnosPorMedico);

    // Convertir datos al formato del gráfico
    this.chartData = this.prepareChartData(this.cantidadTurnosPorMedico);
    console.log('Chart Data:', this.chartData);

    // Call generarGrafico after processing data
    this.generarGrafico();
  }

  generarGrafico(): void {
    console.log('Generating chart with data:', this.chartData);

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    if (this.chartData) {
      const ctx = this.turnosPorMedicoChart.nativeElement.getContext('2d');
      if (ctx) {
        this.chartInstance = new Chart(ctx, {
          type: 'bar',
          data: this.chartData,
          options: {
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Fecha'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Cantidad de Turnos'
                }
              }
            }
          }
        });
      } else {
        console.error('Failed to get 2D context');
      }
    } else {
      console.error('Canvas element not found');
    }
  }

  groupDataByDoctor(data: { [key: string]: number }): { [doctor: string]: { [fecha: string]: number } } {
    const groupedData: { [doctor: string]: { [fecha: string]: number } } = {};
    for (const [key, count] of Object.entries(data)) {
      const [doctor, fecha] = key.split(' - ');
      if (!groupedData[doctor]) {
        groupedData[doctor] = {};
      }
      groupedData[doctor][fecha] = count;
    }
    return groupedData;
  }

  prepareChartData(data: { [doctor: string]: { [fecha: string]: number } }): any {
    const labels: string[] = [];
    const datasets: any[] = [];

    // Collect all unique dates for labels
    const allDates = new Set<string>();
    for (const doctor in data) {
      Object.keys(data[doctor]).forEach(date => allDates.add(date));
    }

    labels.push(...Array.from(allDates).sort());

    // Create datasets for each doctor
    for (const doctor in data) {
      const doctorData = data[doctor];
      const doctorCounts = labels.map(date => doctorData[date] || 0);

      datasets.push({
        label: doctor,
        data: doctorCounts,
        // You can customize the dataset here (e.g., backgroundColor, borderColor)
        backgroundColor: this.getRandomColor()
      });
    }

    return {
      labels,
      datasets,
    };
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  ngOnInit(): void {}

  // Method to download chart data as Excel
  downloadExcel(): void {
    // Objeto para almacenar la cantidad de turnos por médico y fecha
    const cantidadTurnosPorMedicoFecha: { [key: string]: number } = {};
  
    // Calcular la cantidad de turnos por médico y fecha
    this.turnos.forEach(turno => {
      const medico = `${turno.especialista?.nombre} ${turno.especialista?.apellido}`;
      const fecha = `${turno.fechaHora?.year}-${turno.fechaHora?.mes}-${turno.fechaHora?.dia}`;
      const key = `${medico} - ${fecha}`;
  
      // Incrementar la cantidad de turnos para esta combinación
      if (cantidadTurnosPorMedicoFecha[key]) {
        cantidadTurnosPorMedicoFecha[key]++;
      } else {
        cantidadTurnosPorMedicoFecha[key] = 1;
      }
    });
  
    // Convertir los datos agrupados en una hoja de Excel
    const wsData = Object.keys(cantidadTurnosPorMedicoFecha).map(key => {
      const [medico, fecha] = key.split(' - ');
      return {
        Medico: medico,
        Fecha: fecha,
        Cantidad: cantidadTurnosPorMedicoFecha[key] // Asignar la cantidad correctamente
      };
    });
  
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(wsData);
  
    // Crear el libro de Excel y escribir la hoja
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'TurnosPorMedico');
  
    // Descargar el archivo Excel
    XLSX.writeFile(wb, 'TurnosPorMedico.xlsx');
  }
  
  
  

  // Method to export chart as PDF
  downloadPDF(): void {
    html2canvas(this.turnosPorMedicoChart.nativeElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      
      // Calculate width and height of the image in the PDF
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('TurnosPorMedico.pdf');
    });
  }
}
