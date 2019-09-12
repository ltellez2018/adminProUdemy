import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  
  constructor(public _usuarioService: UsuarioService,
              public router: Router) { }

  
  sonIguales(campoA: string, campoB: string){
    return (group: FormGroup) => {
        const pass = group.controls[campoA].value;
        const passC = group.controls[campoB].value;
        if( pass === passC) {
            return null;
        };

        return {
          sonIguales: true
        };
    };
  }

  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup({
          nombre: new FormControl(null,Validators.required),
          correo: new FormControl(null,[Validators.required, Validators.email]),
          password: new FormControl(null,Validators.required),
          confirmPassword: new FormControl(null,Validators.required),
          condiciones: new FormControl(false)
    }, { validators: this.sonIguales('password', 'confirmPassword') });

    this.forma.setValue({
        nombre: 'Test',
        correo: 'test@gmail.com',
        password: '123456',
        confirmPassword: '123456',
        condiciones: true
    });
  }


  registraUsuario() {
    if(this.forma.invalid) {
      return;
    }

    if(!this.forma.value.condiciones) {
      Swal.fire('Importante' , 'Debe de aceptar las condiciones', 'warning');
      return;
    }
    // *Registrandio el usuario

    const usuario = new Usuario(
                  this.forma.value.nombre,
                  this.forma.value.correo,
                  this.forma.value.password,
                  'Defeault');

    this._usuarioService.crearUsuario(usuario)
              .subscribe(() => this.router.navigate(['/login']));
    
  }

}
  