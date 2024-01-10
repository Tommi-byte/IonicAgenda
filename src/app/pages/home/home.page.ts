import { Component } from '@angular/core';
import { BdlocalService } from 'src/app/services/bdlocal.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nombre : string;
  numero : number;
  
  constructor( private bdLocalService : BdlocalService ) {}

  guardar(){
    this.bdLocalService.guardarContactos(this.nombre, this.numero);
  }

  eliminar(){
    this.bdLocalService.quitarContactos(this.numero);
  }

  borrarBD(){
    this.bdLocalService.borrarBD();
  }
}
