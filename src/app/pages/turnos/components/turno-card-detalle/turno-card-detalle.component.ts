import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EEstadoTurno, Turno } from '../../../../class/turno';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { turnosService } from '../../../../services/turnos.service';
import { Usuario } from '../../../../auth/class/usuario';

@Component({
  selector: 'app-turno-card-detalle',
  templateUrl: './turno-card-detalle.component.html',
  styleUrls: ['./turno-card-detalle.component.scss'],
})
export class TurnoCardDetalleComponent {
  @Input() turno: any = {}; 
  @Input() currentUser: Usuario = { email: '', password: ''}; 

  @Output() throwTurno = new EventEmitter();

  constructor(private router: Router, private turnosSv: turnosService) {}

  getFormattedDate(): string {
    if (this.turno && this.turno.fecha && this.turno.fecha.toDate) {
      const date = this.turno.fecha.toDate();
      return date.toISOString();
    }
    return '';
  }

  getBadgeClass(): string {
    if (this.turno && this.turno.estado) {
      switch (this.turno.estado) {
        case EEstadoTurno.aceptado:
          return 'badge bg-primary';
        case EEstadoTurno.cancelado:
          return 'badge bg-danger';
          case EEstadoTurno.cumplido:
            return 'badge bg-success';
        default:
          return 'badge bg-secondary';
      }
    }
    return 'badge bg-secondary'; // Puedes ajustar el valor predeterminado según tus necesidades
  }

  public cambiarEstadoTurno(estado: string) {
    switch (estado) {
      case 'aceptado':
        this.turno.estado = EEstadoTurno.aceptado;
        break;
      case 'cumplido':
        this.turno.estado = EEstadoTurno.cumplido;
        break;
      case 'cancelado':
        this.turno.estado = EEstadoTurno.cancelado;
        break;
      case 'pendiente':
        this.turno.estado = EEstadoTurno.pendiente;
        break;
      case 'disponible':
        this.turno.estado = EEstadoTurno.disponible;
        break;
      default:
        break;
    }
    this.throwTurno.emit(this.turno);
  }

  //////  modal alerta para cancelar turno /////////////////////////////////////////////////////////////////
  alertaConfirmacion() {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Este proceso es irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, de acuerdo.',
      cancelButtonText: 'No, déjame pensar.',
    }).then((resultado) => {
      if (resultado.value) {
        this.mostrarDialogoComentario(); // Llama a la función para mostrar el cuadro de diálogo del comentario
      } else if (resultado.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'Cancelación realizada con éxito.', 'error');
      }
    });
  }

  mostrarDialogoComentario() {
    Swal.fire({
      title: 'Por favor, comente por qué cancela su turno',
      input: 'text',
      inputPlaceholder: 'Ingrese el comentario aquí...',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      inputValidator: (valor) => {
        if (!valor) {
          return 'Por favor, ingrese un comentario.';
        }
        return '';
      },
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        // cambio estado al turno
        this.turno.motivoRechazo = resultado.value;
        this.cambiarEstadoTurno('cancelado');

        Swal.fire(
          '¡Comentario enviado!',
          'Su comentario ha sido enviado.',
          'success'
        );
      }
    });
  }

  ////////modal alerta para calificar turno ////////////////////////////////////////////////////////////////////////////////
  alertaConfirmacionCalificacion() {
    Swal.fire({
      title: '¿Está seguro de calificar la atención?',
      text: 'Este proceso es irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, de acuerdo.',
      cancelButtonText: 'No, déjame pensar.',
    }).then((resultado) => {
      if (resultado.value) {
        this.mostrarDialogoCalificacion(); // Llama a la función para mostrar el cuadro de diálogo de calificación
      } else if (resultado.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'Acción cancelada.', 'error');
      }
    });
  }

  mostrarDialogoCalificacion() {
    Swal.fire({
      title: 'Calificar Atención',
      text: 'Por favor, califique la atención que recibió.',
      html:
        '<label for="calificacion">Calificación</label>' +
        '<input type="number" id="calificacion" class="form-control" min="1" max="5" placeholder="Ingrese la calificación (1-5)" required>' +
        '<label for="comentario">Comentario</label>' +
        '<input type="text" id="comentario" class="form-control" placeholder="Ingrese un comentario" required>',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        // Validar y procesar la calificación y el comentario
        const calificacionInput = document.getElementById('calificacion') as HTMLInputElement;
        const comentarioInput = document.getElementById('comentario') as HTMLInputElement;

        const calificacion = calificacionInput.value;
        const comentario = comentarioInput.value;

        if (!calificacion || isNaN(Number(calificacion)) || Number(calificacion) < 1 || Number(calificacion) > 5) {
          Swal.showValidationMessage('La calificación debe estar entre 1 y 5.');
        }

        return { nota: Number(calificacion), comentario: comentario };
      },
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        const calificacion = resultado.value;

       

        console.log(this.turno.calificacion);

        this.turno.calificacion = calificacion;
        this.throwTurno.emit(this.turno);

        Swal.fire(
          'Calificación Enviada',
          `Gracias por calificar la atención con ${calificacion.nota} estrellas. Comentario: ${calificacion.comentario}`,
          'success'
        );
      }
    });
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  handleRating(rating: number): void {
    // Manejar la calificación seleccionada, por ejemplo, enviarla al servidor
    console.log(`Se ha seleccionado una calificación de ${rating} estrellas.`);
  }

  public atenderTurno(turno: Turno) {
    this.turnosSv.turnoPaciente = turno.paciente ?? {};
    this.turnosSv.turnoAtencion = turno;

    this.router.navigate(['/atenderturno']);
  }

  public verHistoriaClinica(turno: Turno) {
    this.turnosSv.turnoPaciente = turno.paciente ?? {};
    this.turnosSv.turnoAtencion = turno;

    this.router.navigate(['/historiaclinica']);
  }
}
