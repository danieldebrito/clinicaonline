import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ERole, Usuario } from '../../class/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {

  public error = false;
  public mostrarPass = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private authSvc: AuthService,
    private router: Router,
  ) {}

  async onLogin(): Promise<void> {
    const { email, password } = this.loginForm.value;

    const user = await this.authSvc.SignIn({ email, password });
  }

  public errorFalse(): void {
    this.error = false;
  }

  verOcultarPass() {
    this.mostrarPass = !this.mostrarPass;
  }

  AutoSignIn(){
    
    this.loginForm.setValue({
      email: 'danielrdebrito@gmail.com',
      password: '123456'
    });
    
    //this.authSvc.SignIn( { email: 'danielrdebrito@gmail.com', password: '123456'});
  }
}
