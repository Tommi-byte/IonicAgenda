import { Injectable } from '@angular/core';
import { Iagenda } from '../interfaces/iagenda';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BdlocalService {

  agenda: Iagenda[] = [];
  private _storage: Storage | null = null;

  constructor(private storage: Storage, private toastController: ToastController) {

    this.Init();
    this.cargarContactos();

  }

  async Init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async cargarContactos() {
    const miAgenda = await this.storage.get('agenda');

    if (miAgenda) {
      this.agenda = miAgenda;
    }
  }

  guardarContactos(nombre: string, numero: number) {
    const existe = this.agenda.find(m => m.intNumero === numero);

    if (!existe) {

      this.agenda.unshift({ strNombre: nombre, intNumero: numero });
      this._storage?.set('agenda', this.agenda);
      this.presentToast(" Contacto agregado con exito! ");

    } else {

      this.presentToast(" Contacto ya existe en la agenda ");

    }
  }

  quitarContactos(numero: number) {
    const existe = this.agenda.find(m => m.intNumero === numero);
    if (existe) {
      this.agenda = this.agenda.filter(c => c.intNumero !== numero);
      this._storage?.set('agenda', this.agenda);
      this.presentToast(" Contacto eliminado con exito! ");

    } else {

      this.presentToast(" No existe el contacto ");

    }
  }

  async borrarBD(){
    await this._storage.clear();
    this.agenda = [];
    console.log(this.agenda.length);
    this.presentToast("Se ha eliminado la BD");
  }
  

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      translucent: true,
      color: 'medium',
      position: 'bottom',
      duration: 2000
    })
    toast.present();
  }


}
