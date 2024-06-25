import { Usuario, ERole } from "src/app/auth/class/usuario";

export class Administrador extends Usuario {
  constructor(
    email: string,
    password: string,
    uid?: string,
    id?: string,
    displayName?: string,
    photoURL?: string,
    emailVerified?: boolean,
    nombre?: string,
    apellido?: string,
    sexo?: string,
    dni?: string,
    edad?: string,
    fechaNacimiento?: string,
    foto?: string,
    role?: ERole,
    habilitado?: boolean
  ) {
    super(
      email,
      password,
      uid,
      id,
      displayName,
      photoURL,
      emailVerified,
      nombre,
      apellido,
      sexo,
      dni,
      edad,
      fechaNacimiento,
      foto,
      role,
      habilitado
    );
  }
}
