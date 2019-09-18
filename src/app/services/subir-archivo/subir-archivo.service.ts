import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }


  subirArchivo(archivo: File, tipo: string , id: string) {
    console.log( "file: " , archivo);
    console.log( "tipo: " , tipo);
    console.log( "id: " , id);

    return new Promise (( resolve, reject ) => {
      const  formData = new FormData();
      const xhr = new XMLHttpRequest();
      formData.append('imagen', archivo, archivo.name );
      xhr.onreadystatechange =  () => {
        if ( xhr.readyState === 4) {
          if ( xhr.status === 200 ) {
            console.log('Imagen subida');
            resolve(JSON.parse(xhr.response));
          } else {
              console.log('Fallo la subida', xhr.response);
              reject(xhr.response);
          }
        }
        
      };

      const URL = URL_SERVICIOS + `/upload/${tipo}/${id}`;
      console.log( { URL });
      
      xhr.open('PUT', URL , true);
      xhr.send(formData);
  
    });
  
  }
}
