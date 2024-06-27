import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UsuariosService } from '../../../../auth/services/usuarios.service';
import { Turno } from '../../../../class/turno';
import { Especialista } from '../../../../class/usuarios/especialista';
import { Paciente } from '../../../../class/usuarios/paciente';
import { turnosService } from '../../../../services/turnos.service';

export class PacienteTurnos {
  constructor(
      public paciente?: Paciente,
      public turnos?: Turno[],
  ) { }
}

@Component({
  selector: 'app-mis-pacientes',
  templateUrl: './mis-pacientes.component.html',
  styleUrls: ['./mis-pacientes.component.scss'],
})
export class MisPacientesComponent implements OnInit {

  public mysPacientes: Paciente[] = [];
  public mysPacienteTurnos: PacienteTurnos[] = [];

  public pacientes: Paciente[] = [];

  public turnos: Turno[] = [];
  public mysTurnos: Turno[] = [];

  public currentEspecialista: Especialista = { email: '', password: '' };

  constructor(
    private afAuth: AngularFireAuth,
    private usuariosSv: UsuariosService,
    private turnosSv: turnosService
  ) {}



  public getPacientes() {
    this.usuariosSv.getItems().subscribe((res) => {
      this.pacientes = res;
    });
  }

  public misPacientes() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.usuariosSv.getItemById(user.uid).subscribe((especialista) => {
          this.turnosSv.getItems().subscribe( turnos => {
            this.turnos = turnos;
            this.mysTurnos = this.turnos.filter( t => t.especialista?.uid === especialista.uid ).map( tn => tn );
            //padepue
            //this.pacienteTurnos(this.turnos.filter( t => t.especialista.uid === especialista.uid ).map( tn => tn.paciente ));
          });
        });
      }
    });
  }

  public pacienteTurnos(pacientes: Paciente[]) {
    this.mysPacienteTurnos = [];

    const pacientesUnicos = Array.from(new Set(pacientes.map(p => p.uid)));

    pacientesUnicos.forEach(uid => {
      const paciente = pacientes.find(p => p.uid === uid);
      if (paciente) {
        let pacienteTurno: PacienteTurnos = {
          paciente: paciente,
          turnos: this.mysTurnos
            .filter(tn => tn.paciente?.uid === paciente.uid)
            .sort((a, b) => (b.fecha as any).seconds - (a.fecha as any).seconds) // Access timestamp directly
            .slice(0, 3), // Select the first three
        };

        this.mysPacienteTurnos.push(pacienteTurno);
      }
    });
    }


  getFormattedDate(turno: any): string {
    if (turno && turno.fecha && turno.fecha.toDate) {
      const date = turno.fecha.toDate();
      return date.toISOString();
    }
    return '';
  }


  // USUARIOS //////////////////////////////////////////////////////////////////////////////////
  private getCurrentUser() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.usuariosSv.getItemById(user.uid).subscribe((res) => {
          this.currentEspecialista = res;
        });
      } else {
        this.currentEspecialista = { email: '', password: '' };
      }
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
    //this.getPacientes();
    this.misPacientes();
  }
}
