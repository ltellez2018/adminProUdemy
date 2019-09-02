import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../services/service.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(private _ajuste: SettingsService ) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: any) {
    this.aplicarCheck(link);
    this._ajuste.aplicarTema(tema);
  }


  aplicarCheck(link: any) {
    const selectores: any = document.getElementsByClassName('selector');
    for (const item of selectores) {
      item.classList.remove('working');
    }
    document.getElementById(link).classList.add('working');

    
  }

  colocarCheck() {
    const selectores: any = document.getElementsByClassName('selector');
    const tema = this._ajuste.ajustes.tema;
    for (const item of selectores) {
      if(item.getAttribute('data-theme') === tema) {
        item.classList.add('working');
        break;
      }
    }
  }

}
