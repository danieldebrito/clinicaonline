import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../../../auth/services/usuarios.service';
import { ERole } from '../../../auth/class/usuario';
import { StorageService } from '../../../services/File/storage.service';
import { Especialista } from '../../../class/usuarios/especialista';

@Component({
  selector: 'app-sign-up-especialista',
  templateUrl: './sign-up-especialista.component.html',
  styleUrl: './sign-up-especialista.component.scss'
})
export class SignUpEspecialistaComponent {

  public captchaHabilitado = true;
  public captchaResultado = false;

  public photoSelected: any = 'assets/images/placeholder-user.png';
  public image: any = {};
  public urlPhotoPath = '';

  public error = false;
  public mostrarPass = false;
  public role: ERole = ERole.especialista;

  public userEmail: string = '';
  public userPwd: string = '';

  createForm = new FormGroup({
    //uid: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //id: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //emailVerified: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    displayName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    //photoURL: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(2)]),
    sexo: new FormControl('', [Validators.required, Validators.minLength(1)]),
    dni: new FormControl('', [Validators.required, Validators.minLength(7)]),
    edad: new FormControl('', [Validators.required, Validators.minLength(1)]),
    fechaNacimiento: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //role: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //habilitado: new FormControl('', [Validators.required, Validators.minLength(6)])
    captchaHabilitado: new FormControl(true),
  });

  constructor(
    private authService: AuthService,
    private usuariosService: UsuariosService,
    private storageService: StorageService) { }


  onFileSelected(event: any) {
    this.image = event.target.files[0];
    if (this.image) {
      this.storageService.uploadFile(this.image)
        .then(downloadUrl => {
          console.log('Archivo subido correctamente. URL:', downloadUrl);
          this.urlPhotoPath = downloadUrl;

          // para mostrar la imagen en el html ////////////////////////////////////////////////////////
          const reader = new FileReader();
          reader.onload = e => this.photoSelected = reader.result;
          reader.readAsDataURL(this.image);
        })
        .catch(error => {
          console.error('Error al subir el archivo:', error);
        });
    }
  }

  public async createUser() {
    if (this.createForm.valid) {

      //const habilitadoValue = this.createForm.value.habilitado === 'true' ? true : false;

      const newEspecialista: Especialista = {
        //id: this.createForm.value.id ?? '',
        //emailVerified: this.createForm.value.emailVerified ?? '',

        email: this.createForm.value.email ?? '',
        password: this.createForm.value.password ?? '',
        displayName: this.createForm.value.displayName ?? '',
        photoURL: this.urlPhotoPath ?? '',
        nombre: this.createForm.value.nombre ?? '',
        apellido: this.createForm.value.apellido ?? '',
        sexo: this.createForm.value.sexo ?? '',
        dni: this.createForm.value.dni ?? '',
        edad: this.createForm.value.edad ?? '',
        fechaNacimiento: this.createForm.value.fechaNacimiento ?? '',
        role: this.role,
        habilitado: false,
      };

      this.authService.SignUp(newEspecialista);


      console.log(newEspecialista);
      //this.usuariosService.addItem(newEspecialista);

    } else {
      console.log("El formulario no es válido, realiza alguna acción o muestra un mensaje de error.");
      // El formulario no es válido, realiza alguna acción o muestra un mensaje de error.
    }
  }


/////////////////////////////////  CAPTCHA ///////////////////////////////////////////////////////////////////
  public onCaptchaVerified(isVerified: boolean) {
    if (isVerified) {
      console.log('Captcha verificado correctamente');
      this.captchaResultado = true;
    } else {
      console.log('Captcha incorrecto');
      this.captchaResultado = false;
    }
  }

  public onCheckboxChange() {
    // Este método se ejecutará cuando el estado del checkbox cambie
    const valorActual = this.createForm.get('captchaHabilitado')?.value;

    // acciónes del checkbox
    if (!valorActual) {
      console.log('El checkbox ha sido desactivado');
      this.captchaHabilitado = false;
    } else  {
      console.log('El checkbox ha sido activado');
      this.captchaHabilitado = true;
    }
  }
  /////////////////////////////////  END CAPTCHA ///////////////////////////////////////////////////////////////////


  ngOnInit(): void {
    this.role = this.usuariosService.role;
  }
}
