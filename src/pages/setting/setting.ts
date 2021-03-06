import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import {PersonCenterPage} from "../person-center/person-center";
/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private storage:Storage,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  back(){
    this.viewCtrl.dismiss();
  }

  login_out(){
    this.navCtrl.pop()
      // this.navCtrl.parent.select(0)
    this.storage.ready().then(()=>{
      // this.storage.remove('isLogin');
      this.storage.remove('user_id');
      // this.viewCtrl.dismiss();
      // this.navCtrl.push(PersonCenterPage)
    });

  }
}
