import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Especialidad } from '../../../../class/especialidad';
import { Jornada } from '../../../../class/jornada';
import { EspecialidadesService } from '../../../../services/especialidades.service';
import { JornadasService } from '../../../../services/jornadas.service';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styleUrls: ['./jornada.component.scss']
})
export class JornadaComponent implements OnInit {

  @Output() pasaItem = new EventEmitter();

  public userLoggedUID: string = '';


  public especialidades: Especialidad[] = [];
  public especialidad: any = {};

  public jornadas: Jornada[] = [];
  //public jornada: Jornada = {};

  formulario = new FormGroup({
    diaDeSemanaEnNumeros: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(60), Validators.pattern("^[0-9]*$")]),
    horaInicioJornada: new FormControl(8, [Validators.required, Validators.min(1), Validators.max(60), Validators.pattern("^[0-9]*$")]),
    horaFinJornada: new FormControl(19, [Validators.required, Validators.min(1), Validators.max(60), Validators.pattern("^[0-9]*$")]),
    duracionTurno: new FormControl(19, [Validators.required, Validators.min(1), Validators.max(60), Validators.pattern("^[0-9]*$")]),
    especialidad: new FormControl([], [Validators.required]),
  });

  constructor(
    private especialidadesSv: EspecialidadesService,
    private jornadasSv: JornadasService,
    private afAuth: AngularFireAuth) { }

  public resetFrom() {
    this.formulario.reset({
      diaDeSemanaEnNumeros: 0,
      horaInicioJornada: 8,
      horaFinJornada: 19
    });
  }

  public enviarItem() {
    this.pasaItem.emit({ itemEnviado: this.formulario.getRawValue() });
    // alert(event.target.value);
    // console.log(this.formulario.getRawValue());
  }

  public getEspecialidades() {
    this.especialidadesSv.getItems().subscribe(res => {
      this.especialidades = res;
    });
  }

  // Maneja el cambio en el select
onEspecialidadChange(event: any) {
  // Obtén el objeto de especialidad seleccionado
  this.especialidad = this.especialidades.find(
    (item) => item.nombre?.toLowerCase() == event.target.value.toLowerCase()
  );
}

  ///* jornadas//////////////////////////////////////////////////////////////////////////////////
  public addJornada() {

    const newItem: Jornada = {
      //id: this.createForm.value.id ?? '',
      //emailVerified: this.createForm.value.emailVerified ?? '',

      diaDeSemanaEnNumeros: this.formulario.value.diaDeSemanaEnNumeros ?? 0,
      horaInicioJornada: this.formulario.value.horaInicioJornada ?? 0,
      horaFinJornada: this.formulario.value.horaFinJornada ?? 0,
      duracionTurno: this.formulario.value.duracionTurno ?? 0,
      especialidad: this.especialidad,
      userUID: this.userLoggedUID ?? '',
    };

    console.log(newItem);

    this.jornadasSv.addItem(newItem);
  }


  public getJornadas() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.jornadasSv.getItems().subscribe(res => {
          this.jornadas = res.filter(j => j.userUID == user.uid);
        });
      } else {
        this.jornadas = [];
      }
    });

  }

  ///////////////////////////////////////////////////////////////////////////////////////////////

  getLoggedUerUID() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userLoggedUID = user.uid;
      } else {
        this.userLoggedUID = '';
      }
    });
  }

  public ngOnInit(): void {
    this.getEspecialidades();
    this.getJornadas();
    this.getLoggedUerUID();
  }
}
