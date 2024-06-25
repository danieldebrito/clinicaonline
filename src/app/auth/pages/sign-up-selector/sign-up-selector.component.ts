import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ERole } from '../../../auth/class/usuario';
import { UsuariosService } from '../../../auth/services/usuarios.service';

@Component({
  selector: 'app-sign-up-selector',
  templateUrl: './sign-up-selector.component.html',
  styleUrl: './sign-up-selector.component.scss'
})
export class SignUpSelectorComponent {
  constructor(
    public router: Router,
    private usuariosSv: UsuariosService) {}


  public redirectCreate(roleNombre: string) {
    if(roleNombre == 'paciente'){
      this.router.navigate(['signup-paciente']);
      this.usuariosSv.role = ERole.paciente;
    }else{
      this.router.navigate(['signup-especialista']);
      this.usuariosSv.role = ERole.especialista;
    }
  }
}
