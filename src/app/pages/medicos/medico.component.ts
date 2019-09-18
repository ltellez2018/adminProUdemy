import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital [] = [];
  medico: Medico = new Medico(null, null, null, null, null);
  hospital: Hospital = new Hospital(null, null, null);

  constructor(public medicoService: MedicoService,
              public hospitalService: HospitalService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public modalUploadService: ModalUploadService ) {
                activatedRoute.params.subscribe(params =>{
                  const id = params['id'];
                  if(id !== 'nuevo') {
                    this.cargarMedico(id);
                  }
                });
               }

  ngOnInit() {
    this.cargarHospitales();
    this.modalUploadService.notificacion
      .subscribe( resp => {
          this.medico.img = resp.medico.img;
      });

  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales(0)
     .subscribe( ( resp: any ) => {
           
           this.hospitales = resp.hospitales;
     });
   
 
   }


  guardarMedico(f: NgForm) {
    if(f.invalid) {
      return;
    }
    console.log(  this.medico  );
    this.medicoService.guardarMedico(this.medico)
    .subscribe( medico => {
      this. medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);      
    })
   
  }

  cambioHospital(id: string ) {
    this.hospitalService.obtenerhospital(id)
        .subscribe( hospital => this.hospital =  hospital); 
    
  }

  cargarMedico(id: string) {
    this.medicoService.buscarMedicoId(id)
      .subscribe( medico => {
          console.log( medico );
          this.medico = medico;
          this.medico.hospital = medico.hospital._id;
          this.cambioHospital(this.medico.hospital);

        });
  }

  cambiarFoto() {
    console.log( this.medico );
    this.modalUploadService.mostrarModal('medicos', this.medico._id);

  }
}
