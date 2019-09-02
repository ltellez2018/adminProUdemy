import { Injectable ,Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaURL: 'assets/css/colors/',
    tema: 'default'
  };

  constructor(@Inject(DOCUMENT) private _document) { }

  guardarAjuste() {
      localStorage.setItem('ajustes',JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    if(localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
    }else {      
      this.aplicarTema(this.ajustes.tema);
    }    
}


aplicarTema(tema: string) {
  const url = `assets/css/colors/${tema}.css`;
  this._document.getElementById('tema').setAttribute('href', url);
  
  this.ajustes.tema = tema;
  this.ajustes.temaURL = url;
  this.guardarAjuste();

}
//  INTERFACE PARA RESTRINGIR LOS AJUSTES
}

interface Ajustes {
  temaURL: string;
  tema: string;
}
