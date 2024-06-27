import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../../auth/services/usuarios.service';
import { Especialista } from '../../../../class/usuarios/especialista';
import { EEstadoTurno, Turno } from '../../../../class/turno';
import { JornadasService } from '../../../../services/jornadas.service';
import { ERole, Usuario } from '../../../../auth/class/usuario';
import { turnosService } from '../../../../services/turnos.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Paciente } from '../../../../class/usuarios/paciente';

import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Especialidad } from '../../../../class/especialidad';


import Swal from 'sweetalert2';
import { Jornada } from '../../../../class/jornada';


@Component({
  selector: 'app-sacar-turno',
  templateUrl: './sacar-turno.component.html',
  styleUrls: ['./sacar-turno.component.scss'],
})
export class SacarTurnoComponent implements OnInit {
  public active = 1;
  public disabled = true;

  public especialistas: Especialista[] = [];
  public especialistaSeleccionado: any = {};

  public especialidades: Especialidad[] = [];
  public especialidadSeleccionada: Especialidad = {};

  public turnos: Turno[] = [];
  public turnosHorariosDia: Turno[] = [];
  public turnoSeleccionado: Turno = {};

  public jornadas: any[] = [];
  public jornadasFiltradas: Jornada[] = [];

  public paciente: Paciente = { email: '', password: '' };

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(
    private usuariosSv: UsuariosService,
    private afAuth: AngularFireAuth,
    private jornadasSv: JornadasService,
    private turnosSv: turnosService,
    private _formBuilder: FormBuilder
  ) {}

  tinyAlert() {
    Swal.fire('Turno Solicitado exitosamente!!');
  }

  //  mat-horizontal-stepper Angular Material  //////////////////////////////////////////////
  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }

  // ESPECIALISTAS ///////////////////////////////////////////////////////////////////////////
  public getEspecialistas() {
    this.usuariosSv.getItems().subscribe((res) => {
      this.especialistas = res.filter((usr) => usr.role == ERole.especialista);
    });
  }

  // JORNADAS /////////////////////////////////////////////////////////////////////////////////
  public getJornadas() {
    this.jornadasSv.getItems().subscribe((res) => {
      this.jornadas = res;
    });
  }

  public getjornadasEspecialista(especialidad: Especialidad) {
    this.especialidadSeleccionada = especialidad;
    this.jornadasFiltradas = this.jornadas.filter(
      (j) =>
        j.especialidad === this.especialidadSeleccionada &&
        j.userUID === this.especialistaSeleccionado.uid
    );
  }

  // ESPECIALIDADES ////////////////////////////////////////////////////////////////////////////
  public getEspecialidadesEspecialista(event: Usuario) {

    this.especialidades = this.jornadas
      .filter((j) => j.userUID === event.uid && j.especialidad) // Verificar especialidad no sea undefined
      .map((j) => j.especialidad);
    this.especialistaSeleccionado = event;

  }

  // TURNOS ////////////////////////////////////////////////////////////////////////////////////

  public getTurnos(){
    this.turnosSv.getItems().subscribe( res => {
      this.turnos = res;
    });
  }

  public seleccionarHorariosPorDiaTurnos(event: any) {
    this.turnosHorariosDia = event.turnos.filter(
      (e: any) =>
        e.fecha.getDate() === event.turnoSelect.fecha.getDate() &&
        e.fecha.getMonth() === event.turnoSelect.fecha.getMonth() &&
        e.fecha.getFullYear() === event.turnoSelect.fecha.getFullYear()
    );
  }
  

  public SeleccionarTurno(event: any) {
    this.turnoSeleccionado = event;
  }

  public tomarTurno(turno: any) {
    turno.estado = EEstadoTurno.pendiente;
    this.turnosSv.addItem(turno);

    this.turnoSeleccionado = {};
  }

  // USUARIOS //////////////////////////////////////////////////////////////////////////////////
  private getCurrentUser() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.usuariosSv.getItemById(user.uid).subscribe((res) => {
          this.paciente = res;
        });
      } else {
        this.paciente = { email: '', password: '' };
      }
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getEspecialistas();
    this.getJornadas();
    this.getTurnos();
  }
}
