import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController  } from 'ionic-angular';
import {ReturnmoneyPage} from "../returnmoney/returnmoney";


/**
 * Generated class for the LineitemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lineitem',
  templateUrl: 'lineitem.html',
})
export class LineitemPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl:ModalController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LineitemPage');
  }
  toReturnmoneyPage(){
    const modelPage=this.modalCtrl.create(ReturnmoneyPage);
    modelPage.present();
  }
  back(){
    this.navCtrl.pop();
  }
}
