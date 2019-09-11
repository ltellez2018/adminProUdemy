import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let url = URL_SERVICIOS + '/img';
    
    

    // * Google image
    if(img.indexOf('https') >= 0) {
      return img;
    }
    // * With image
    if(!img){
      return url + '/usuarios/xxx';
    }

    switch ( tipo ) {
      case 'usuario':
          url  += '/usuarios/' + img;
          break;
       case 'medico':
          url  += '/medicos/' + img;
          break;
       case 'hospital':
          url  += '/hospitales/' + img;
          break;    
       default:
         console.log('Tipo de imagen no existe , usuario,medico, hospitales');
         url += '/usuarios/xxx';
         break;
    }
    return url;
  }

}
