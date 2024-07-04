import { Component, OnInit } from '@angular/core';
import { Especialista } from '../../../../class/usuarios/especialista';
import { Paciente } from '../../../../class/usuarios/paciente';
import { ERole } from '../../../../auth/class/usuario';
import { UsuariosService } from '../../../../auth/services/usuarios.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-perfil-paciente',
  templateUrl: './perfil-paciente.component.html',
  styleUrl: './perfil-paciente.component.scss',
})
export class PerfilPacienteComponent implements OnInit {
  
  public paciente: Paciente = {};

  constructor(
    private usuariosSv: UsuariosService,
    private afAuth: AngularFireAuth
  ) {}

  public getUsuarios() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.usuariosSv.getItemByUid(user.uid).subscribe((res) => {
          this.paciente = res;

          console.table(this.paciente);
        });
      }
    });
  }

  ngOnInit(): void {
    this.getUsuarios();
  }
}
