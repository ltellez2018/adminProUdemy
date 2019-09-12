import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario [] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public usuarioService: UsuarioService,
              public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notificacion
    .subscribe( () => this.cargarUsuarios());
  }

  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('usuarios', id);

  }
  cargarUsuarios() {
   this. cargando = true;
   this.usuarioService.cargarUsuarios(this.desde)
    .subscribe( ( resp: any) => {
          this.totalRegistros = resp.total;
          this.usuarios = resp.usuarios;         
    });
   this. cargando = false;

  }
  cambiarDesde(valor: number){
      const desde = this.desde + valor;
      if( desde >= this.totalRegistros ) {
        return;
      }
      if ( desde < 0 ) {
        return;
      }

      this.desde += valor;
      this.cargarUsuarios();      
  }

  buscarUsuario(termino: string){
    this. cargando = true;
    if ( termino.length <= 0 ) { 
      this.cargarUsuarios();
      return;
    }
    this.usuarioService.buscarUsuarios(termino)
    .subscribe( (usuarios: Usuario[]) => {
              this.usuarios = usuarios;
               
    });
    this. cargando = false;
    
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id ===  this.usuarioService.usuario._id ) {
      Swal.fire('No se puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }
    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta a puto de borrar a ${usuario.nombre}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.borrarUsuario(usuario._id)
          .subscribe (resp => {
            console.log(resp);  
            this.cargarUsuarios();
          });
        Swal.fire(
          'Eliminado!',
          `Usuario ${usuario.nombre}`,
          'success'
        )
      }
    });  
  }

  guardarUsuario(usuario: Usuario){
    this.usuarioService.actualizarUsuario(usuario)
    .subscribe();
  }
}
