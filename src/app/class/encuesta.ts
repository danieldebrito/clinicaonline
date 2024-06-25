export class Encuesta {
    constructor(
        public id?: string,
        public atencion?: number,
        public puntualidad?: number,
        public conformidad?: number,
        public amabilidad?: number,
        public profecionalidad?: number
    ) {}
}
