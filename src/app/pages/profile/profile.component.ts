import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor(public usuarioService : UsuarioService) { 
    this.usuario = usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario : Usuario) {
    this.usuario.nombre = usuario.nombre;
    if ( !this.usuario.email) {
      this.usuario.email = usuario.email;
    }
    this.usuarioService.actualizarUsuario(this.usuario)
    .subscribe();
    

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

  cargarImage() {
    this.usuarioService.camiarImagen(this.imagenSubir, this.usuario._id);
  }

}
