import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {



  constructor(public httpClient: HttpClient,
              public usuarioService: UsuarioService) {
    console.log('-->  H o s p i t a l S e r v i c e  < ---');
   }

 

  // * * * * * * * * * * * * * * * * * * * * * * * //
  // *       L o a d   H o s p i t a l s         * //
  // * * * * * * * * * * * * * * * * * * * * * * * //

   cargarHospitales( desde: number = 0) {
    const URL = URL_SERVICIOS + '/hospital?desde= ' +  desde;
    return this.httpClient.get(URL);
   }


  // * * * * * * * * * * * * * * * * * * * * * * * //
  // *    G e t   H o s p i t a l  b y  i d      * //
  // * * * * * * * * * * * * * * * * * * * * * * * //

  obtenerhospital(id: string){
    const URL = URL_SERVICIOS + '/hospital/' +  id;
    return this.httpClient.get(URL).pipe (map (
        (resp: any) => resp.hospital));
   }


  // * * * * * * * * * * * * * * * * * * * * * * * //
  // *       D e l e t e   H o s p i t a l s     * //
  // * * * * * * * * * * * * * * * * * * * * * * * //

   borrarhospital(id: string){
    const URL = URL_SERVICIOS + '/hospital/' +  id + '?token=' + this.usuarioService.token;
    return this.httpClient.delete(URL);
   }

    // * * * * * * * * * * * * * * * * * * * * * * * //
  // *       C r e a t e   H o s p i t a l s     * //
  // * * * * * * * * * * * * * * * * * * * * * * * //

  crearHospital(nombre: string) {
    const URL = URL_SERVICIOS + '/hospital' + '?token=' + this.usuarioService.token;
    return  this.httpClient.post(URL, { nombre , img : 'default' })
              .pipe( map ( (resp: any)  => resp.hospital ));
  }

   
  // * * * * * * * * * * * * * * * * * * * * * * * //
  // *       S e a r c h   H o s p i t a l s     * //
  // * * * * * * * * * * * * * * * * * * * * * * * //

   buscarHospital(termino: string) {
    const URL = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' +  termino;
    return this.httpClient.get(URL)
    .pipe(map ( ( resp: any ) => resp.hospitales));
   }


   // * * * * * * * * * * * * * * * * * * * * * * * //
  // *       S e a r c h   H o s p i t a l s     * //
  // * * * * * * * * * * * * * * * * * * * * * * * //
  
  actualizarHospital(hospital : Hospital){
    const URL = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this.usuarioService.token;
    return this.httpClient.put(URL, hospital)
    .pipe(map ( ( resp: any ) => {
      Swal.fire('Hospital actualziado', resp.hospital.nombre, 'success'); 
      return resp.hospital;
    }));
  }
 
}
