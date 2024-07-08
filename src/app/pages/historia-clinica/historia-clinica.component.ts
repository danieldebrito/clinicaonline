import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ERole } from '../../auth/class/usuario';
import { UsuariosService } from '../../auth/services/usuarios.service';
import { EEstadoTurno, Turno } from '../../class/turno';
import { Paciente } from '../../class/usuarios/paciente';
import { turnosService } from '../../services/turnos.service';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss'],
})
export class HistoriaClinicaComponent implements OnInit {
  public paciente: Paciente = { email: '', password: '' };
  public turnosPaciente: Turno[] = [];
  profesionalSeleccionado: any;
  especialistas: any = [];

  constructor(
    private usuariosSv: UsuariosService,
    private afAuth: AngularFireAuth,
    private turnosSv: turnosService
  ) {
    if (this.turnosSv.turnoPaciente) {
      this.paciente = this.turnosSv.turnoPaciente;
    }
  }

  getFormattedDate(fecha: any): string {
    const date = fecha.toDate();
    return date.toISOString();
  }

  generatePDF() {
    const pdf = new jsPDF();

    // Position of the image
    pdf.addImage('assets/logo.png', 'PNG', 10, 10, 40, 10);

    // Set font size and type for the title
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    // Add title to the document
    pdf.text('Historia Clínica', 90, 20);
    ///y   x   ejes

    // Reset font size and type for the rest of the document
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');

    // Data of the patient
    const pacienteInfo = `
  DATOS DEL PACIENTE : 
      Nombre: ${this.paciente.nombre} ${this.paciente.apellido}
      Email: ${this.paciente.email}
      DNI: ${this.paciente.dni}  Fecha de Nacimiento: ${this.paciente.fechaNacimiento}
    `;
    pdf.text(pacienteInfo, 40, 30);

    // List of turns
    let yPosition = 50;

    for (const turno of this.turnosPaciente) {
      let turnoInfo = `
      ___________________________________________________________________________________________________________________________
  
        Fecha Atención: ${turno.fechaHora?.dia} / ${turno.fechaHora?.mes} / ${turno.fechaHora?.year}
        Especialista: ${turno.especialista?.nombre}  ${turno.especialista?.apellido} Especialidad: ${turno.especialidad?.nombre}
        
        Detalle de Atención : 
        * Altura : ${turno.atencionPaciente?.altura} cm           * Temperatura : ${turno.atencionPaciente?.temperatura} ºC
        * Presión : ${turno.atencionPaciente?.presion} mm Hg      * Peso : ${turno.atencionPaciente?.peso} kg
  
        Reseña Medica : ${turno.atencionPaciente?.resena}
      `;
      //  información dinámica
      if (
        turno.atencionPaciente?.dinamicos &&
        turno.atencionPaciente.dinamicos.length > 0
      ) {
        turnoInfo += '\n          Datos Adicionales:';
        for (const dinamico of turno.atencionPaciente.dinamicos) {
          turnoInfo += `\n        * ${dinamico.dinamicoKey} : ${dinamico.dinamicoValue}`;
        }
      }

      pdf.text(turnoInfo, 10, yPosition);
      yPosition += 80; // separación entre turnos
    }

    // Save the PDF
    pdf.save('historia_clinica.pdf');
  }

  obtenerTurnosProfesional() {
    console.log(this.profesionalSeleccionado);

    if (this.profesionalSeleccionado) {
      this.turnosSv.getItems().subscribe((turnos) => {
        this.turnosPaciente = turnos.filter(
          (e) =>
            e.especialista?.uid == this.profesionalSeleccionado && this.turnosSv.turnoPaciente.uid &&
            e.estado == EEstadoTurno.cumplido
        );
        // Llamar a la función para generar el PDF con los turnos filtrados
        //this.generatePDF();
      });
    } else {
      // Manejar el caso en el que no se haya seleccionado ningún especialista
      console.error('Debe seleccionar un especialista');
      // Puedes mostrar un mensaje al usuario o manejarlo de otra manera apropiada
    }
  }

  // USUARIOS //////////////////////////////////////////////////////////////////////////////////
  private getCurrentUser() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.usuariosSv.getItemById(user.uid).subscribe((res) => {
          if (res.role == ERole.paciente) {
            this.turnosSv.turnoPaciente = res;
            this.paciente = res;

            this.turnosSv.getItems().subscribe((res) => {
              const turnos: Turno[] = res;

              if (this.turnosSv.turnoPaciente) {
                this.turnosPaciente = turnos.filter(
                  (e) =>
                    e.paciente?.uid == this.turnosSv.turnoPaciente.uid &&
                    e.estado == EEstadoTurno.cumplido
                );

                this.especialistas = this.turnosPaciente.map(
                  (e) => e.especialista
                );
              }
            });
          }
        });
      } else {
        this.paciente = { email: '', password: '' };
      }
    });
  }

  obtenerCalificacion() {
    // Supongamos que obtienes la calificación y el comentario desde algún servicio o directamente
    const calificacion = 5; // Esto debería ser dinámico en tu aplicación
    const comentario = 'Me atendió muy bien';

    // Mostrar SweetAlert con la calificación y el comentario
    Swal.fire({
      icon: 'info',
      title: 'Calificación del Turno',
      html: `
        <p>Calificación: ${calificacion}</p>
        <p>Comentario: ${comentario}</p>
      `,
      confirmButtonText: 'Cerrar',
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();

    this.turnosSv.getItems().subscribe((res) => {
      const turnos: Turno[] = res;

      console.table(turnos);

      if (this.turnosSv.turnoPaciente) {
        this.turnosPaciente = turnos.filter(
          (e) =>
            e.paciente?.uid == this.turnosSv.turnoPaciente.uid &&
            e.estado == EEstadoTurno.cumplido
        );
      }
    });
  }
}
