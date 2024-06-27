import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../../../auth/class/usuario';
import { Turno } from '../../../../class/turno';

@Component({
  selector: 'app-turnos-grid',
  templateUrl: './turnos-grid.component.html',
  styleUrls: ['./turnos-grid.component.scss']
})
export class TurnosGridComponent {

  @Input() turnos: Turno[] = [];
  @Input() currentUser: Usuario = { email: '', password: '' };

  @Output() thowTurno = new EventEmitter();
  
  public filtroPalabra: string = '';

  public aplicarFiltro(): void {
    this.turnos = this.turnos.filter((turno: Turno) => {
      const especialidad = turno.especialidad?.nombre?.toLowerCase().includes(this.filtroPalabra.toLowerCase());
      const especialistadNombre = turno.especialista?.nombre?.toLowerCase().includes(this.filtroPalabra.toLowerCase());
      const especialistaApellido = turno.especialista?.apellido?.toLowerCase().includes(this.filtroPalabra.toLowerCase());
      const pacienteNombre = turno.paciente?.nombre?.toLowerCase().includes(this.filtroPalabra.toLowerCase());
      const pacienteApellido = turno.paciente?.apellido?.toLowerCase().includes(this.filtroPalabra.toLowerCase());

      return especialidad || especialistadNombre || especialistaApellido || pacienteNombre || pacienteApellido;
    });
  }

  public lanzarTurno(turno: Turno) {
    this.thowTurno.emit(turno);
  }
}
