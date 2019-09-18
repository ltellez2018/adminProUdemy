import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError  } from 'rxjs/operators';
import Swal from 'sweetalert2';


import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any [] = [];
  constructor(public http: HttpClient, 
              public router: Router,
              public subirArchivo: SubirArchivoService) {
    console.log('Servicio de usuario listo!!');
    this.cargarStorage();

   }

   renuevaToken() {
     const URL = URL_SERVICIOS + '/login/renuevaToken' + '?token=' + this.token;
     return this.http.get( URL )
     .pipe(
       map ( ( resp: any ) => {
            this.token = resp.token;
            localStorage.setItem('token', this.token);
            console.log( 'Token renovado');
            return true;
       }),
       catchError( (error: any) => {
         this.router.navigate(['/login']);
         Swal.fire('No se pudo renovar el token','No fue posible renovar token', 'error');
         throw error;
       })
       );
   }

    estaLogueado(): boolean {
        return(this.token.length > 5) ? true : false;
    }

    cargarStorage() {
      if (localStorage.getItem('token')) {
        this.token = localStorage.getItem('token');
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
        this.menu = JSON.parse(localStorage.getItem('menu'));
      } else {
        this.token = '';
        this.usuario = null;
        this.menu = null;
      }
    }

   gurdarStorage(id: string , token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

   }

   logout() {
     console.log('logout ...');
     this.usuario = null;
     this.token = '';
     this.menu = [];
     localStorage.removeItem('token');
     localStorage.removeItem('usuario');
     localStorage.removeItem('menu');
     this.router.navigate(['/login']);


   }

   loginGoogle( token: string) {

    const url = URL_SERVICIOS + '/login/google';
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json"').append('Authorization', token);

    return this.http.post(url, null, { headers })
                .pipe(map ((res: any) => {
                    this.gurdarStorage( res.id, res.token, res.usuario, res.menu);
                    return true;
                }));
  }

  // * * * * * * * * * * * * * * * * * * * * * * * //
  // *           L O G I N                       * //
  // * * * * * * * * * * * * * * * * * * * * * * * //

  login(usuario: Usuario, recordar: boolean = false) {
    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const URL = URL_SERVICIOS + '/login';
    return this.http.post(URL, usuario)
            .pipe(
              map( (res: any) => {
               this.gurdarStorage( res.id, res.token, res.usuario, res.menu);
               return true;
              }),
              catchError( (error: any) => {
                console.log( error.status );
                Swal.fire('Error login', error.error.mensaje, 'error');
                throw error;
              })
            );
  }

  // * * * * * * * * * * * * * * * * * * * * * * * //
  // *          C R E A T E   U S E R            * //
  // * * * * * * * * * * * * * * * * * * * * * * * //
   crearUsuario(usuario: Usuario) {
     const URL = URL_SERVICIOS + '/usuario';
     // ! Rergesa un observador
     return  this.http.post(URL, usuario)
     .pipe(
         map((resp: any) => {
            Swal.fire('Usuario creado', usuario.email, 'success');
            return resp.usuario;
         }),
         catchError( (err: any) => {
          console.log( err );
          Swal.fire(err.error.mensaje, err.error.errors.message, 'error');
          throw err;
        })
    );

   }

  // * * * * * * * * * * * * * * * * * * * * * * * //
  // *          U P D A T E   U S E R            * //
  // * * * * * * * * * * * * * * * * * * * * * * * //
   actualizarUsuario(usuario: Usuario) {
    const URL = URL_SERVICIOS + '/usuario/' +  usuario._id + '?token=' + this.token;
    return  this.http.put(URL, usuario)
     .pipe(
       map((resp: any) => {

            if(usuario._id === this.usuario._id ) {
              const usuarioDb = resp.usuario;
              this.gurdarStorage(usuarioDb._id, this.token, usuarioDb, this.menu);
            }
            Swal.fire('Usuario actualizado', usuario.nombre, 'success');
            return true;
     }),
     catchError( (err: any) => {
      console.log( err );
      Swal.fire(err.error.mensaje, err.error.errors.message, 'error');
      throw err;
    })
     
     );
   }

   camiarImagen(file: File, id: string) {
     this.subirArchivo.subirArchivo(file, 'usuarios', id)
       .then( (resp: any) => {
         console.log( resp );
         this.usuario.img = resp.usuario.img;
         this.gurdarStorage(id, this.token, this.usuario,this.menu);
         Swal.fire('Imagen actualizado', this.usuario.nombre, 'success');
       })
       .catch( resp => {
          console.log( resp );
          
       });
   }

   cargarUsuarios( desde: number = 0) {
    const URL = URL_SERVICIOS + '/usuario?desde= ' +  desde;
    return this.http.get(URL);
   }

   buscarUsuarios(termino: string) {
    const URL = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' +  termino;
    return this.http.get(URL)
    .pipe(map((resp: any) => resp.usuarios));
   }

   borrarUsuario(id: string){
    const URL = URL_SERVICIOS + '/usuario/' +  id + '?token=' +this.token;
    return this.http.delete(URL);
    //.pipe(map((resp: any) => resp.usuarios));
   }

}
