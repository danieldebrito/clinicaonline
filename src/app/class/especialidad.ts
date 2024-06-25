import { Jornada } from "./jornada";

export class Especialidad {
    constructor(
        public id?: string,
        public nombre?: string,
        public photoURL?: string,
        public habilitado?: boolean,
    ) { }
}
