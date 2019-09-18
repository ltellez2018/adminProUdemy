import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(public httpClient: HttpClient,
              public usauriosService: UsuarioService) { }


  // * * * * * * * * * * * * * * * * * * * * * * * //
  // *       L o a d   H o s p i t a l s         * //
  // * * * * * * * * * * * * * * * * * * * * * * * //

  cargarMedicos( desde: number = 0) {
    const URL = `${URL_SERVICIOS}/medico?desde=${desde}`;
    console.log( { URL } );
    
    return this.httpClient.get(URL);
   }

  // * * * * * * * * * * * * * * * * * * * * * * * //
  // *       S e a r c h   M E D I C O S       * //
  // * * * * * * * * * * * * * * * * * * * * * * * //

  buscarMedicos(termino: string) {
    const URL = URL_SERVICIOS + '/busqueda/coleccion/medicos/' +  termino;
    return this.httpClient.get(URL)
    .pipe(map ( ( resp: any ) => resp.medicos));
   }

   // * * * * * * * * * * * * * * * * * * * * * * * //
  // *       D e l e t e   M E D I C O S         * //
  // * * * * * * * * * * * * * * * * * * * * * * * //

  borrarMedico(id: string){
    const URL = URL_SERVICIOS + '/medico/' +  id + '?token=' + this.usauriosService.token;
    return this.httpClient.delete(URL);
   }

  // * * * * * * * * * * * * * * * * * * * * * * * //
  // *       C r e a  te   M E D I C O S         * //
  // * * * * * * * * * * * * * * * * * * * * * * * //

  guardarMedico(medico: Medico ) {
    let URL = URL_SERVICIOS + '/medico/';
    
    if ( medico._id ) { 
      // * Updating 
      URL += '/' + medico._id;
      URL +=  '?token=' + this.usauriosService.token;
      return this.httpClient.put(URL , medico)
      .pipe(map (  (resp: any)  => { 
        Swal.fire('Médico actualizado', medico.nombre, 'success');
        return resp.medico;
    }));

    } else {
      // * Creating
      URL +=  '?token=' + this.usauriosService.token;
      return this.httpClient.post(URL, medico)
        .pipe(map (  (resp: any)  => { 
          Swal.fire('Médico creado', medico.nombre, 'success');
          return resp.medico;
      }));
    }
  }

     // * * * * * * * * * * * * * * * * * * * * * * * //
  // *       find by id   M E D I C O S         * //
  // * * * * * * * * * * * * * * * * * * * * * * * //

  buscarMedicoId(id: string) {
    const URL = URL_SERVICIOS + '/medico/' + id;
    return this.httpClient.get(URL).pipe(map (
        (resp: any)  => resp.medico));
  }
}
