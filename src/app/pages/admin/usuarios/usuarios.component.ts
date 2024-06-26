import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';

import * as XLSX from 'xlsx';
// services ///////////////////////////////////////////////////////////////
import { UsuariosService } from '../../../auth/services/usuarios.service';
import { turnosService } from '../../../services/turnos.service';
// class /////////////////////////////////////////////////////////////////
import { Usuario } from '../../../auth/class/usuario';
import { Paciente } from '../../../class/usuarios/paciente';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

  public usuarios: any;

  constructor(
    private usuariosSvc: UsuariosService,
    private turnosSv: turnosService,
    private router: Router
  ) {}

  public getUsuarios() {
    this.usuariosSvc.getItems().subscribe((res) => {
      this.usuarios = res;
    });
  }

  public deleteUsuario(usuario: any) {
    this.usuariosSvc.delete(usuario.id);
    this.getUsuarios();
  }

  public verHistoriaClinica(paciente: Paciente) {
    this.turnosSv.turnoPaciente = paciente;
    this.router.navigate(['/historiaclinica']);
  }

  public habilitarEspecialista(usuario: Usuario){
    console.log(usuario);
    usuario.habilitado = !usuario.habilitado;

    console.log(usuario);

    const uid  = usuario.uid ?? '';

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
  
  ngOnInit(): void {
    this.getUsuarios();
  }
}
