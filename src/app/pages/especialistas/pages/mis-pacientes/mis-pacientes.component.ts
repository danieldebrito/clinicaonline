import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UsuariosService } from '../../../../auth/services/usuarios.service';
import { Turno } from '../../../../class/turno';
import { Usuario } from '../../../../auth/class/usuario';
import { turnosService } from '../../../../services/turnos.service';
import { Paciente } from '../../../../class/usuarios/paciente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-pacientes',
  templateUrl: './mis-pacientes.component.html',
  styleUrls: ['./mis-pacientes.component.scss'],
})
export class MisPacientesComponent implements OnInit {

  public currenUSer: Usuario = {};
  public misTurnos: Turno[] = [];
  public pacientesUnicos: Paciente[] = [];
  private pacienteTurnosMap: { [uid: string]: Turno[] } = {};

  constructor(
    private afAuth: AngularFireAuth,
    private usuariosSv: UsuariosService,
    private turnosSv: turnosService,
    private router: Router,
  ) {}

  private getCurrentUser() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.usuariosSv.getItemById(user.uid).subscribe((res) => {
          this.currenUSer = res;

          this.turnosSv.getItems().subscribe((turnos) => {
            this.misTurnos = turnos.filter(
              (t) => t.especialista?.uid == this.currenUSer.uid
            );
            this.pacientesUnicos = this.getUniquePacientes(this.misTurnos);
            this.mapPacientesToTurnos(this.misTurnos);
          });
        });
      } else {
        this.currenUSer = {};
      }
    });
  }

  private getUniquePacientes(turnos: Turno[]): Paciente[] {
    const pacientesMap: { [uid: string]: Paciente } = {};
    turnos.forEach(turno => {
      if (turno.paciente && !pacientesMap[turno.paciente.uid!]) {
        pacientesMap[turno.paciente.uid!] = turno.paciente;
      }
    });
    return Object.values(pacientesMap);
  }

  private mapPacientesToTurnos(turnos: Turno[]) {
    turnos.forEach(turno => {
      if (turno.paciente) {
        if (!this.pacienteTurnosMap[turno.paciente.uid!]) {
          this.pacienteTurnosMap[turno.paciente.uid!] = [];
        }
        this.pacienteTurnosMap[turno.paciente.uid!].push(turno);
      }
    });
  }

  public verHistoriaClinica(paciente: Paciente) {
    const turnosPaciente = this.pacienteTurnosMap[paciente.uid!];
    if (turnosPaciente && turnosPaciente.length > 0) {
      const turno = turnosPaciente[0]; // O puedes elegir cualquier otro criterio para seleccionar el turno
      this.turnosSv.turnoPaciente = paciente;
      this.turnosSv.turnoAtencion = turno;
      this.router.navigate(['/historiaclinica']);
    }
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }
}
