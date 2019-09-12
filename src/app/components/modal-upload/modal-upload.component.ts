import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string; 

  constructor(public subirArchivoService: SubirArchivoService,
              public modalUploadService: ModalUploadService ) { 
      
    
  }

  ngOnInit() {
  }

  seleccionImagen(file : File) {
    if ( !file ) {
      this.imagenSubir = null;
      return;
    }
    if(file.type.indexOf('image') < 0) {
      Swal.fire('Solo imagenes','El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = file;
    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL(file);

    reader.onloadend = () =>  this.imagenTemp = reader.result.toString();
    
  }

  subirImagen() {
    this.subirArchivoService.subirArchivo(this.imagenSubir, this.modalUploadService.tipo,this.modalUploadService.id)
      .then(resp => {
            this.modalUploadService.notificacion.emit( resp );
            this.cerrarModal();
      })
      .catch ( err => {
        console.log( 'Error en la carga');
        
      });
    
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this.modalUploadService.ocultarModal();
  }

}
