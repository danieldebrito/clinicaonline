import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Especialidad } from '../../class/especialidad';
import { StorageService } from '../../services/File/storage.service';
import { EspecialidadesService } from '../../services/especialidades.service';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.scss']
})
export class EspecialidadesComponent implements OnInit {

  public showAdd: boolean = false;
  public especialidades: Especialidad[] = [];

  public photoSelected: any = 'assets/images/icons/default.png';
  public image: any = {};
  public urlPhotoPath = 'assets/images/icons/default.png';

  createForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(6)]),
    duracionTurno: new FormControl( 30, [Validators.required, Validators.minLength(2)]),
  });

  constructor( 
    private storageService: StorageService,
    private especialidadesSv: EspecialidadesService
    ) { }
  
    public create() {
    if (this.createForm.valid) {
      const newItem: Especialidad = {
        nombre: this.createForm.value.nombre ?? '',
        habilitado: true ?? false,
        photoURL: this.urlPhotoPath,
      };
      this.especialidadesSv.addItem(newItem);
      this.ChangeView();
    } else {
      console.log("El formulario no es válido, realiza alguna acción o muestra un mensaje de error.");
      // El formulario no es válido, realiza alguna acción o muestra un mensaje de error.
    }
  }



  public ChangeView(){
    this.showAdd = !this.showAdd;
  }

  public getEspecialidades(){
    this.especialidadesSv.getItems().subscribe( res => {
      this.especialidades = res;
      
      console.log(this.especialidades);
    } );
  }

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

  ngOnInit(): void {
    this.getEspecialidades();
  }
}
