import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital [] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public hospitalService: HospitalService,
              public modalUploadService: ModalUploadService,
              public usuarioService: UsuarioService) { }

  ngOnInit() {
    console.log('-->  H o s p i t a l e s C o m p o n e n t < ---');
    this.cargarHospitales();
    this.modalUploadService.notificacion
    .subscribe( () => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales(this.desde)
     .subscribe( ( resp: any ) => {
           this.totalRegistros = resp.total;
           this.hospitales = resp.hospitales;
     });
    this.cargando = false;
 
   }

   mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('hospitales', id);

   }


   guardarHospital(hospital: Hospital) {
     this.hospitalService.actualizarHospital(hospital)
         .subscribe();

   }

 
   borrarHospital(hospital: Hospital) {
    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta a puto de borrar a ${hospital.nombre}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.hospitalService.borrarhospital(hospital._id)
          .subscribe (resp => {
            console.log(resp);
            this.cargarHospitales();
          });
        Swal.fire(
          'Eliminado!',
          `Hospital ${hospital.nombre}`,
          'success'
        )
      }
    });  
  }

  async crearHospital() {

    const { value: nombre } = await Swal.fire({
      title: 'Registro de Hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'El nombre es obligatorio!'
        }
      }
    });

    if (nombre) {
      this.hospitalService.crearHospital(nombre)
          .subscribe(() => {
            Swal.fire(`Hospital  ${nombre} registrado`);
            this.cargarHospitales(); 
          });
    }
  }


  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if( desde >= this.totalRegistros ) {
      return;
    }
    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();
  }

  buscarHospital(termino: string) {
    this.cargando = true;
    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }
    this.hospitalService.buscarHospital(termino)
    .subscribe( (hospitales: Hospital[]) => {
              this.hospitales = hospitales;
    });
    this. cargando = false;
  }


}
