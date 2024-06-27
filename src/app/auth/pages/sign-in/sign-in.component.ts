import { Component, OnInit } from '@angular/core';
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
export class SignInComponent implements OnInit {

  public error = false;
  public mostrarPass = false;
  public usuariosAccesoRapido: Usuario[] = [];


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private authSvc: AuthService,
    public usuariosSv: UsuariosService,
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

  public login(email: string, password: string){
    let user: Usuario = {
      email: email,
      password: password
    }
    this.authSvc.SignIn(user);
  }

  public loguear(item: any){

    let user: Usuario = {
      email: item.email,
      password: item.password
    }

    this.loginForm.setValue({
      email: item.email,
      password: item.password
    });

    //this.authSvc.SignIn(user);

  }

  public accesosRapidos(){
    this.usuariosSv.getItems().subscribe( usuarios => {

      const pacientes: Usuario[] = usuarios.filter(usuario => usuario.role === ERole.paciente).slice(0, 3);
      const especialistas: Usuario[] = usuarios.filter(usuario => usuario.role === ERole.especialista).slice(0, 2);
      const admin: Usuario[] = usuarios.filter(usuario => usuario.role === ERole.administrador).slice(0, 1);

      this.usuariosAccesoRapido = pacientes.concat(especialistas.concat(admin));
      
      //console.log(this.usuariosAccesoRapido);

    } );
  }

  ngOnInit() { 
    this.accesosRapidos();
  }
}

