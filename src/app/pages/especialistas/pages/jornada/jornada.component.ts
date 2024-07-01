import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Especialidad } from '../../../../class/especialidad';
import { Jornada } from '../../../../class/jornada';
import { EspecialidadesService } from '../../../../services/especialidades.service';
import { JornadasService } from '../../../../services/jornadas.service';
import { Especialista } from '../../../../class/usuarios/especialista';
import { UsuariosService } from '../../../../auth/services/usuarios.service';

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
  public errorDiaRepetido: boolean = false;

  public especialista: any = {};

  formulario = new FormGroup({
    diaDeSemanaEnNumeros: new FormControl(0, [Validators.required, this.uniqueDiaValidator.bind(this)]),
    horaInicioJornada: new FormControl(8, [Validators.required, Validators.min(1), Validators.max(24)]),
    horaFinJornada: new FormControl(19, [Validators.required, Validators.min(1), Validators.max(24)]),
    duracionTurno: new FormControl(0, [Validators.required, Validators.min(1)]),
    especialidad: new FormControl('', [Validators.required]),
  });

  constructor(
    private especialidadesSv: EspecialidadesService,
    private usuariosSv: UsuariosService,
    private jornadasSv: JornadasService,
    private afAuth: AngularFireAuth
  ) { }

  public resetForm() {
    this.formulario.reset({
      diaDeSemanaEnNumeros: 0,
      horaInicioJornada: 8,
      horaFinJornada: 19,
      duracionTurno: 0,
      especialidad: ''
    });
  }

  public enviarItem() {
    this.pasaItem.emit({ itemEnviado: this.formulario.getRawValue() });
  }

  public getEspecialidades() {
    this.especialidadesSv.getItems().subscribe(res => {
      this.especialidades = res;
    });
  }

  onEspecialidadChange(event: any) {
    this.especialidad = this.especialidades.find(
      (item) => item.nombre?.toLowerCase() == event.target.value.toLowerCase()
    );
  }

  public addJornada() {
    const diaSeleccionado = this.formulario.value.diaDeSemanaEnNumeros;
    const diaRepetido = this.jornadas.some(jornada => jornada.diaDeSemanaEnNumeros === diaSeleccionado);

    if (diaRepetido) {
      this.errorDiaRepetido = true;
      return;
    }

    const newItem: Jornada = {
      diaDeSemanaEnNumeros: this.formulario.value.diaDeSemanaEnNumeros ?? 0,
      horaInicioJornada: this.formulario.value.horaInicioJornada ?? 0,
      horaFinJornada: this.formulario.value.horaFinJornada ?? 0,
      duracionTurno: this.formulario.value.duracionTurno ?? 0,
      especialidad: this.especialidad,
      userUID: this.userLoggedUID ?? '',
    };

    console.log(newItem);
    this.jornadasSv.addItem(newItem);
    this.errorDiaRepetido = false;  // Resetear el error si se guarda correctamente
    this.resetForm();  // Resetear el formulario después de guardar
  }

  public getJornadas() {
    this.afAuth.authState.subscribe(user => {
      if (user) {

        this.usuariosSv.getItemByUid(user.uid).subscribe( res => {
          this.especialista = res;
        });
        
        this.jornadasSv.getItems().subscribe(res => {
          this.jornadas = res.filter(j => j.userUID == user.uid);
        });
      } else {
        this.jornadas = [];
      }
    });
  }

  getLoggedUserUID() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userLoggedUID = user.uid;
      } else {
        this.userLoggedUID = '';
      }
    });
  }

  // Validación personalizada para asegurarse de que el día no se repita
  uniqueDiaValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (this.jornadas && control.value) {
      const diaRepetido = this.jornadas.some(jornada => jornada.diaDeSemanaEnNumeros === control.value);
      return diaRepetido ? { 'diaRepetido': true } : null;
    }
    return null;
  }

  ngOnInit(): void {
    this.getEspecialidades();
    this.getJornadas();
    this.getLoggedUserUID();
  }
}
