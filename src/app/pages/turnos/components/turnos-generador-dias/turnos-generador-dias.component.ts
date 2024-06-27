import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Especialidad } from '../../../../class/especialidad';
import { Jornada } from '../../../../class/jornada';
import { EEstadoTurno, Fecha, Turno } from '../../../../class/turno';
import { TurnoDay } from '../../../../class/turnoDay';
import { Paciente } from '../../../../class/usuarios/paciente';

@Component({
  selector: 'app-turnos-generador-dias',
  templateUrl: './turnos-generador-dias.component.html',
  styleUrls: ['./turnos-generador-dias.component.scss'],
})
export class TurnosGeneradorDiasComponent {

  public turnosGenerados: Turno[] = [];
  public turnosGeneradosDias: TurnoDay[] = [];


  @Input() jornadas: Jornada[] = [];
  @Input() especialista: any = {};
  @Input() especialidad: Especialidad = {};
  @Input() paciente: Paciente = { email: '', password: '' };
  @Input() turnos: Turno[] = [];


  @Output() throwTurno = new EventEmitter<{ turnoSelect: TurnoDay; turnos: Turno[] }>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['jornadas'] && changes['jornadas'].currentValue) {
      const updatedJornadas: Jornada[] = changes['jornadas'].currentValue;
      this.generateTurnos(updatedJornadas);
    }
  }

  public generateTurnos(jornadas: Jornada[]) {
    this.turnosGenerados = [];

    jornadas.forEach((element) => {
      this.generadorDeTurnos(element);
    });
  }

  public async generadorDeTurnos(jornada: any) {
    // cuantos intervalos por hora * cantidad de horas de atención
    const cant =
      (60 / jornada.duracionTurno) *
      (jornada.horaFinJornada - jornada.horaInicioJornada);

    for (let j = 0; j < 16; j++) {
      // le sumo días a la fecha de hoy hasta 15 días
      const today = this.getToday();
      today.setDate(today.getDate() + j);

      // si el número de día coincide con el de la jornada, cargo horarios
      if (today.getDay() === parseInt(jornada.diaDeSemanaEnNumeros)) {
        for (let i = 0; i <= cant; i++) {
          // Clonar la fecha actual
          const clonedDate = new Date(today);

          // Sumarle i * duracionTurno minutos al clon, ( jornada.horaInicioJornada * 60 ) es la hora de inicio de la jornada en minutos
          clonedDate.setMinutes(
            clonedDate.getMinutes() +
            jornada.horaInicioJornada * 60 +
            i * jornada.duracionTurno
          );

          this.turnosGenerados.push({
            fecha: clonedDate,
            dia: this.getNombreDia(clonedDate.getDay()),
            fechaHora: this.getFechaHora(clonedDate),
            especialista: this.especialista,
            especialidad: this.especialidad,
            paciente: this.paciente,
            estado: EEstadoTurno.disponible,
          });
        }
      }
    }

    this.turnosGenerados = this.quitarTurnosTomados(this.turnosGenerados, this.turnos);

    this.turnosGeneradosDias = this.turnosGenerados
    .map((tg) => ({
      fecha: tg.fecha,
      diaNombre: tg.dia,
      dia: tg.fecha?.getDate(), // Agrega el operador de encadenamiento opcional '?'
      mes: tg.fecha?.getMonth(),
      year: tg.fecha?.getFullYear(),
    }))
    .filter(
      (value, index, self) =>
        self.findIndex(
          (item) =>
            item.dia === value.dia &&
            item.mes === value.mes &&
            item.year === value.year
        ) === index
    );

  }

  public getFechaHora(fecha: Date): Fecha {

    let fechaHora: Fecha = {};

    fechaHora.Hora = fecha.getHours();
    fechaHora.Minutos = fecha.getMinutes();
    fechaHora.dia = fecha.getDay();
    fechaHora.mes = fecha.getMonth() + 1;
    fechaHora.year = fecha.getFullYear();

    return fechaHora;
  }

  public quitarTurnosTomados(turnosNuevos: Turno[], turnosTomados: Turno[]): Turno[] {
    return turnosNuevos.filter(turnoNuevo => {
      // La función some devuelve true si al menos un elemento del array cumple la condición
      return !turnosTomados.some(turnoTomado => this.sonIguales(turnoNuevo, turnoTomado));
    });
  }

  public sonIguales(turnoNuevo: Turno, turnoTomado: Turno): boolean {
    return (
      this.sonFechasIguales(turnoNuevo.fechaHora, turnoTomado.fechaHora) &&
      turnoNuevo.especialista?.id === turnoTomado.especialista?.id &&
      turnoNuevo.paciente?.id === turnoTomado.paciente?.id &&
      turnoNuevo.especialidad?.id === turnoTomado.especialidad?.id
    );
  }

  private sonFechasIguales(fecha1: any, fecha2: any): boolean {
    return (
      fecha1.dia === fecha2.dia &&
      fecha1.mes === fecha2.mes &&
      fecha1.year === fecha2.year &&
      fecha1.Hora === fecha2.Hora &&
      fecha1.Minutos === fecha2.Minutos
    );
  }

  public getNombreDia(dia: number) {
    const dias = [
      'Dom',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];
    return dias[dia];
  }

  private getToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer las horas, minutos, segundos y milisegundos a 0
    return today;
  }

  public lanzarTurno(turno: TurnoDay) {
    //console.log({ turnoSelect: turno, turnos: this.turnosGenerados });
    this.throwTurno.emit({ turnoSelect: turno, turnos: this.turnosGenerados });
  }
}
