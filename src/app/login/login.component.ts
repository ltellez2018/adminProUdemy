import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { element } from 'protractor';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email: string;
  recuerdame: boolean = false;
  auth2: any;

  constructor(public router: Router,
              public  _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    // * Google singin Init
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if( this.email.length > 1) {
      this.recuerdame = true;
    }

    

  }

  googleInit() {
    gapi.load('auth2',() => {
        this.auth2 = gapi.auth2.init({
          client_id: '380332066665-fgu49s5l3004kabveft4ck0r5ht1lcp9.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.attachSingin(document.getElementById('btnGoogle'));

    });
  }

  attachSingin( element ) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
       // let profile = googleUser.getBasicProfile();
       const token = googleUser.getAuthResponse().id_token;
       console.log( token);
  
       this._usuarioService.loginGoogle(token)
       .subscribe(() => this.router.navigate(['/dashboard']));
        
    });
  }

  ingresar(forma: NgForm) {
    if( forma.invalid ) {
        return;
    }
    const usuario = new Usuario(null, forma.value.email, forma.value.password);
    this._usuarioService.login(usuario, forma.value.recuerdame)
          .subscribe(() => this.router.navigate(['/dashboard']));
  }



}
