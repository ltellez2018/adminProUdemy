import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico [] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(private medicosService: MedicoService) { }

  ngOnInit() {
      this.cargarMedicos();
  }

// * * * * * * *LOAD MEDICOS* * * * * * * * * //

  cargarMedicos() {
    this.cargando = true;
    this.medicosService.cargarMedicos(this.desde)
     .subscribe( ( resp: any ) => {
             console.log( resp );
             this.totalRegistros = resp.total;
             this.medicos = resp.medicos;
     });
    this.cargando = false;
  }

  // * * * * * * *SEARCH MEDICOS* * * * * * * * * //

  buscarMedicos(termino: string) {
    this.cargando = true;
    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }
    this.medicosService.buscarMedicos(termino)
    .subscribe( (medicos: Medico[]) => {
              this.medicos = medicos;
    });
    this. cargando = false;
  }



  // * * * * * * *DELETE MEDICOS* * * * * * * * * //

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta a puto de borrar a ${medico.nombre}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.medicosService.borrarMedico(medico._id)
          .subscribe (resp => {
            console.log(resp);
            this.cargarMedicos();
          });
        Swal.fire(
          'Eliminado!',
          `MEdico ${medico.nombre}`,
          'success'
        )
      }
    });  
  }


  // * * * * * * *PAGINATION* * * * * * * * * //
  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if ( desde >= this.totalRegistros ) {
        return;
      }
  
    if ( desde < 0 ) {
        return;
      }
  
    this.desde += valor;
    this.cargarMedicos();
  }

}