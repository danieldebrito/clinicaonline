import { AtencionPaciente } from './atencionPaciente';
import { Encuesta } from './encuesta';
import { Especialidad } from './especialidad';
import { Especialista } from './usuarios/especialista';
import { Paciente } from './usuarios/paciente';

export class Turno {
  constructor(
    public id?: string,
    public fecha?: Date, // fecha con el formato Date
    public dia?: string, // nombre del dia de la semana en español, ejemplo "viernes"
    public fechaHora?: Fecha,  // fecha con mi formato personalizado
    public especialista?: Especialista,
    public paciente?: Paciente,
    public especialidad?: Especialidad,
    public estado?: EEstadoTurno,
    public motivoRechazo?: string,
    public encuesta?: Encuesta,
    public calificacion?: Calificacion,
    public atencionPaciente?: AtencionPaciente
  ) { }
}

export enum EEstadoTurno {
  aceptado = 'aceptado',
  cumplido = 'cumplido',
  cancelado = 'cancelado',
  pendiente = 'pendiente',
  disponible = 'disponible'
}

export class Fecha {
  constructor(
    public dia?: number,
    public mes?: number,
    public year?: number,
    public Hora?: number,
    public Minutos?: number,
  ) { }
}

export class Calificacion {
  constructor(
    public nota?: number,
    public cometario?: string,
  ) { }
}

