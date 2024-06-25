import { Especialidad } from "./especialidad";

export class Jornada {
  constructor(
    public id?: string,
    public diaDeSemanaEnNumeros?: number,
    public horaInicioJornada?: number,
    public horaFinJornada?: number,
    public especialidad?: Especialidad,
    public duracionTurno?: number,
    public userUID?: string
  ) {}
}
