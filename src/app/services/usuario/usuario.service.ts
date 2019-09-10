import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router) {
    console.log('Servicio de usuario listo!!');
    this.cargarStorage();

   }

    estaLogueado(): boolean {
        return(this.token.length > 5) ? true : false;
    }

    cargarStorage() {
      if (localStorage.getItem('token')){
        this.token = localStorage.getItem('token');
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
      } else {
        this.token = ''
        this.usuario = null;
      }
    
    
    }

   gurdarStorage(id: string , token: string, usuario: Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;

   }

   logout() {
     console.log('logout ...');     
     this.usuario = null;
     this.token = '';
     localStorage.removeItem('token');
     localStorage.removeItem('usuario');
     this.router.navigate(['/login']);


   }

   loginGoogle( token: string) {
 
    const url = URL_SERVICIOS + '/login/google';
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json"').append('Authorization', token);
 
    return this.http.post(url, null, { headers })
                .pipe(map ((res: any) => {
                    this.gurdarStorage( res.id, res.token, res.usuario);
                    return true;
                }));
  }

  login(usuario: Usuario, recordar: boolean = false){
    if( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const URL = URL_SERVICIOS + '/login';
    return this.http.post(URL,usuario)
            .pipe(map( (res: any) => {
               this.gurdarStorage( res.id, res.token, res.usuario);
             /*    localStorage.setItem('id', resp.id);
                localStorage.setItem('token', resp.token);
                localStorage.setItem('usuario', JSON.stringify(resp.usuario)); */
               return true;
            }));

  }

   crearUsuario(usuario: Usuario) {
     const URL = URL_SERVICIOS + '/usuario';
     // ! Rergesa un observador
     return  this.http.post(URL, usuario)
     .pipe(map((resp: any) => {
            Swal.fire('Usuario creado', usuario.email, 'success');
            return resp.usuario;
     }));

   }
}
