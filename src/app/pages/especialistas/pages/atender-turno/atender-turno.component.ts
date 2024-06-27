import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AtencionPaciente } from '../../../../class/atencionPaciente';
import { EEstadoTurno } from '../../../../class/turno';
import { turnosService } from '../../../../services/turnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-atender-turno',
  templateUrl: './atender-turno.component.html',
  styleUrls: ['./atender-turno.component.scss']
})
export class AtenderTurnoComponent implements OnInit {

  public turno: any = {};
  public atencion: AtencionPaciente = {};


  createForm = new FormGroup({
    altura: new FormControl('', [Validators.required, Validators.min(10), Validators.max(999)]),
    peso: new FormControl('', [Validators.required, Validators.min(1), Validators.max(999)]),
    temperatura: new FormControl('', [Validators.required, Validators.min(1), Validators.max(999)]),
    presion: new FormControl('', [Validators.required, Validators.min(1), Validators.max(999)]),
    resena: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    'dinamicos': new FormArray([])
  });

  constructor(
    private turnosSv: turnosService,
    private router: Router) { }

  tinyAlert() {
    Swal.fire('Turno atendido exitosamente !!');
  }

  addDinamico() {
    (this.createForm.get('dinamicos') as FormArray).push(new FormGroup({
      'dinamicoKey': new FormControl('', Validators.required),
      'dinamicoValue': new FormControl('', Validators.required),
    }));
  }

  deleteDinamico(index: number) {
    (this.createForm.get('dinamicos') as FormArray).removeAt(index);
  }

  get dinamicosFormArray() {
    return this.createForm.get('dinamicos') as FormArray;
  }

  public createAtencion() {
    if (this.createForm.valid) {
      const newItem: AtencionPaciente = {
        altura: Number(this.createForm.value.altura),
        peso: Number(this.createForm.value.peso),
        temperatura: Number(this.createForm.value.temperatura),
        presion: Number(this.createForm.value.presion),
        resena: this.createForm.value.resena ?? '',
        dinamicos: this.createForm.value.dinamicos?.map((item: any) => ({
          dinamicoKey: item.dinamicoKey,
          dinamicoValue: item.dinamicoValue
        }))
      };

      this.turno.atencionPaciente = newItem;
      this.turno.estado = EEstadoTurno.cumplido;

      this.turnosSv.update(this.turno.id, this.turno);

      this.router.navigate(['/misturnos']);
      this.tinyAlert();

    } else {
      console.log("El formulario no es válido, realiza alguna acción o muestra un mensaje de error.");
    }
  }

  getFormattedDate(): string {
    if (this.turno && this.turno.fecha && this.turno.fecha.toDate) {
      const date = this.turno.fecha.toDate();
      return date.toISOString();
    }
    return '';
  }

  ngOnInit() {
    this.turno = this.turnosSv.turnoAtencion;
    console.log(this.turno);
  }
}
