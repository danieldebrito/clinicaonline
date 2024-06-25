import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../../../auth/services/usuarios.service';
import { ERole } from '../../../auth/class/usuario';
import { StorageService } from '../../../services/File/storage.service';
import { Paciente } from '../../../class/usuarios/paciente';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
 
  public isCaptchaDisabled: boolean = false;

  // FOTO DE PERFIL
  public photoSelected: any = 'assets/images/placeholder-user.png';
  public image: any = {};
  public urlPhotoPath = '';

  // FOTO DEL DNI
  public photoSelectedDNI: any = 'assets/images/placeholder-dni.png';
  public imageDNI: any = {};
  public urlPhotoPathDNI = '';

  public error = false;
  public mostrarPass = false;

  public role: ERole = ERole.paciente;

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
    obraSocial: new FormControl('', [Validators.required, Validators.minLength(2)]),
    //role: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //habilitado: new FormControl('', [Validators.required, Validators.minLength(6)])
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

  onFileSelectedDNI(event: any) {
    this.imageDNI = event.target.files[0];
    if (this.imageDNI) {
      this.storageService.uploadFile(this.imageDNI)
        .then(downloadUrl => {
          console.log('Archivo subido correctamente. URL:', downloadUrl);
          this.urlPhotoPathDNI = downloadUrl;

          // para mostrar la imagen en el html ////////////////////////////////////////////////////////
          const reader = new FileReader();
          reader.onload = e => this.photoSelectedDNI = reader.result;
          reader.readAsDataURL(this.imageDNI);
        })
        .catch(error => {
          console.error('Error al subir el archivo:', error);
        });
    }
  }


  public async createUser() {
    if (this.createForm.valid) {

      //const habilitadoValue = this.createForm.value.habilitado === 'true' ? true : false;

      const newEspecialista: Paciente = {
        //id: this.createForm.value.id ?? '',
        emailVerified: false,

        email: this.createForm.value.email ?? '',
        password: this.createForm.value.password ?? '',
        displayName: this.createForm.value.displayName ?? '',
        photoURL: this.urlPhotoPath,
        photoDNIURL: this.urlPhotoPathDNI,
        nombre: this.createForm.value.nombre ?? '',
        apellido: this.createForm.value.apellido ?? '',
        sexo: this.createForm.value.sexo ?? '',
        dni: this.createForm.value.dni ?? '',
        edad: this.createForm.value.edad ?? '',
        fechaNacimiento: this.createForm.value.fechaNacimiento ?? '',
        obraSocial: this.createForm.value.obraSocial ?? '',
        role: this.role,
        habilitado: true,
      };

      this.authService.SignUp(newEspecialista);
      // console.log(newEspecialista);
      //this.usuariosService.addItem(newEspecialista);

    } else {
      console.log("El formulario no es válido, realiza alguna acción o muestra un mensaje de error.");
      // El formulario no es válido, realiza alguna acción o muestra un mensaje de error.
    }
  }

  public onCaptchaVerified(isVerified: boolean) {
    if (isVerified) {
      console.log('Captcha verificado correctamente. Realizar operación de alta.');
      // Lógica para realizar la operación de alta aquí
    } else {
      console.log('Captcha incorrecto. No se realizará la operación de alta.');
    }
  }

  ngOnInit(): void {
    this.role = this.usuariosService.role;
  }
}
