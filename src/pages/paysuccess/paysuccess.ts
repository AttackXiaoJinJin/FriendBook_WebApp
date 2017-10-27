import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import {LineitemPage} from "../lineitem/lineitem"

/**
 * Generated class for the PaysuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paysuccess',
  templateUrl: 'paysuccess.html',
})
export class PaysuccessPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl:ModalController,) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaysuccessPage');
  }
  checkorder(){
     const modelPage=this.modalCtrl.create(LineitemPage);
     modelPage.present();
  }

}
