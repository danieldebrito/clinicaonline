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
import { EspecialidadesService } from '../../../../services/especialidades.service';

@Component({
  selector: 'app-sacar-turno-por-especialidad',
  templateUrl: './sacar-turno-por-especialidad.component.html',
  styleUrl: './sacar-turno-por-especialidad.component.scss',
})
export class SacarTurnoPorEspecialidadComponent {

  public active = 1;
  public disabled = true;

  public especialistas: Especialista[] = [];
  public especialistaSeleccionado: any = {};
  public especialistasFiltrados: Especialista[] = [];

  public especialidades: Especialidad[] = [];
  public especialidadSeleccionada: Especialidad = {};

  public turnos: Turno[] = [];
  public turnosHorariosDia: Turno[] = [];
  public turnoSeleccionado: Turno = {};
  public especialidadesFiltradas: Especialidad[] = [];

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
    private especialidadesSv: EspecialidadesService,
    private _formBuilder: FormBuilder
  ) {}

  // MISCELANEAS ///////////////////////////////////////////////////////////////////////////
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

  seleccionarEspecialidad(especialidad: Especialidad) {
    this.especialidadSeleccionada = especialidad;
    const uids = this.jornadas
      .filter(j => j.especialidad.nombre === especialidad.nombre)
      .map(j => j.userUID);
  
    this.especialistasFiltrados = []; // Reinicia la lista de especialistas antes de llenarla nuevamente
    uids.forEach(uid => {
      this.usuariosSv.getItemByUid(uid).subscribe(profesional => {
        const exists = this.especialistasFiltrados.some(
          (e) => e.uid === profesional.uid
        );
        if (!exists) {
          this.especialistasFiltrados.push(profesional as Especialista);
        }
      });
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

  // Obtener jornadas por especialista
  getJornadasPorEspecialista(especialista: Especialista) {
    this.especialistaSeleccionado = especialista;
    this.jornadasFiltradas = this.jornadas.filter(
      (j) => j.userUID === especialista.uid
    );
  }

  // ESPECIALIDADES ////////////////////////////////////////////////////////////////////////////

  public getEspecialidadesEspecialista(event: Usuario) {
    this.especialidades = this.jornadas
      .filter((j) => j.userUID === event.uid && j.especialidad) // Verificar especialidad no sea undefined
      .map((j) => j.especialidad);
    this.especialistaSeleccionado = event;
  }

  public getEspecialidades() {
    this.especialidadesSv.getItems().subscribe((res) => {
      this.especialidades = res;
    });
  }

  // TURNOS ////////////////////////////////////////////////////////////////////////////////////

  public getTurnos() {
    this.turnosSv.getItems().subscribe((res) => {
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
    this.getEspecialidades();
    this.getJornadas();
    this.getTurnos();
  }
}
