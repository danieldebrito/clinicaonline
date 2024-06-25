import { Usuario, ERole } from "../../auth/class/usuario";

import { Jornada } from "../jornada";

export class Especialista extends Usuario {
    constructor(
        email: string,
        password: string,
        uid?: string | undefined,
        id?: string | undefined,
        displayName?: string | undefined,
        photoURL?: any | undefined,
        emailVerified?: boolean | undefined,
        nombre?: string | undefined,
        apellido?: string | undefined,
        sexo?: string | undefined,
        dni?: string | undefined,
        edad?: string | undefined,
        fechaNacimiento?: string | undefined,
        role?: ERole | undefined,
        habilitado?: boolean | undefined,
        public jornada?: Jornada[]
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
            role,
            habilitado
        );
    }
}
