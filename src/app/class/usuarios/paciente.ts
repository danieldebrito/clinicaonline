import { Usuario, ERole } from "../../auth/class/usuario";

export class Paciente extends Usuario {
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
        role?: ERole,
        habilitado?: boolean,
        /////  propios del paciente
        public photoDNIURL?: string,
        public obraSocial?: string,

    ) {
        photoDNIURL
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
            role,
            habilitado
        );
    }
}
