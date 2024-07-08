import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { UsuariosService } from '../../../../auth/services/usuarios.service';
import { turnosService } from '../../../../services/turnos.service';
import { Usuario } from '../../../../auth/class/usuario';
import { Paciente } from '../../../../class/usuarios/paciente';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  public usuarios: Usuario[] = [];
  p: number = 1; // Página inicial para el paginado

  constructor(
    private usuariosSvc: UsuariosService,
    private turnosSv: turnosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  public getUsuarios() {
    this.usuariosSvc.getItems().subscribe((res) => {
      this.usuarios = res;
    });
  }

  public deleteUsuario(usuario: any) {
    this.usuariosSvc.delete(usuario.id);
    this.getUsuarios();
  }

  public bajarHistoriaClinica(paciente: Paciente) {
    // Descargar historial de turnos del paciente en Excel
    this.turnosSv.getItems().subscribe( t => {
      this.descargarHistorialTurnosExcel(t.filter( t => t.paciente?.uid == paciente.uid ));
    } );
  }

  public verHistoriaClinica(paciente: Paciente) {
    this.turnosSv.turnoPaciente = paciente;
    this.router.navigate(['/historiaclinica']);
  }

  public habilitarEspecialista(usuario: Usuario) {
    usuario.habilitado = !usuario.habilitado;
    const uid = usuario.uid ?? '';
    this.usuariosSvc.update(uid, usuario);
  }

  public exportToExcel() {
    const data: any[] = [];
    this.usuarios.forEach((item: any) => {
      data.push({
        Nombre: `${item.nombre} ${item.apellido}`,
        Rol: item.role,
        Nacimiento: item.fechaNacimiento,
        Email: item.email,
        'Email Verificado': item.emailVerified ? 'Verificado' : 'Sin Verificar',
        Estado: item.habilitado ? 'Habilitado' : 'Deshabilitado',
      });
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');

    // Guardar el archivo
    XLSX.writeFile(wb, 'usuarios.xlsx');
  }

  private descargarHistorialTurnosExcel(turnos: any[]) {
    const data: any[] = [];
    turnos.forEach((turno) => {
      data.push({
        'Fecha del Turno': turno.fechaHora.dia + "/" + turno.fechaHora.mes + "/" + turno.fechaHora.year,
        'Paciente': turno.paciente.nombre + " " + turno.paciente.apellido ,
        'Especialista': turno.especialista.nombre + " " + turno.especialista.apellido,
        'Estado': turno.estado,
        // Agrega más campos según lo necesites
      });
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Historial de Turnos');

    // Guardar el archivo
    XLSX.writeFile(wb, 'historial_turnos.xlsx');
  }
}
