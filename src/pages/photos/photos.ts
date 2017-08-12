import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ModalController, LoadingController } from 'ionic-angular';

import { ShowMapPage } from './../show-map/show-map';

/**
 * Generated class for the PhotosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html',
})
export class PhotosPage {
  public photos: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private db: AngularFireDatabase) {

    let loader = this.loadingCtrl.create({ content: "Carregando fotos..." });
    loader.present();

    this.db.list('/photos').subscribe(photos => {
      this.photos = photos.reverse();
      loader.dismiss();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotosPage');
  }
  
  showMap(location) {
    let modal = this.modalCtrl.create(ShowMapPage, { location: location });
    modal.present();
  }

}
