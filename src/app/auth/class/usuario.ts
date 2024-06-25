export enum ERole {
  publico = 'publico',
  paciente = 'paciente',
  especialista = 'especialista',
  administrador = 'administrador'
}

export class Usuario {
  constructor(
    public email?: string,
    public password?: string,
    public uid?: string,
    public id?: string,
    public displayName?: string,
    public photoURL?: any,
    public emailVerified?: boolean,
    public nombre?: string,
    public apellido?: string,
    public sexo?: string,
    public dni?: string,
    public edad?: string,
    public fechaNacimiento?: string,
    public role?: ERole,
    public habilitado?: boolean
  ) { }
}