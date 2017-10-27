import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
 import {UsersService} from "../../providers/users.service";

import {AlertController} from "ionic-angular";

/**
 * Generated class for the PersondetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-persondetail',
  templateUrl: 'persondetail.html',
  providers:[UsersService]
})
export class PersondetailPage {
  _porsonal:any;
  _articles:any;
  _Hotarticles:any;
  other: string = "他的文章";
  isAndroid: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public  userSer:UsersService,
              public alerCtrl: AlertController,
              platform: Platform,

              ) {
    this.isAndroid = platform.is('android');
  }

  ionViewDidLoad() {

    let that=this;
    let id=this.navParams.get('user_id');
    let str ='{"user_id":'+id+'}';
    let user = JSON.parse(str);
    that.userSer.getBaseById(user,function (result) {
      that._porsonal=result[0];
    })
    that.userSer.showuserput(user,function (result) {
      that._articles=result;
      console.log(that._articles);
    })
    that.userSer.showuserputcoll(user,function (result) {
      that._Hotarticles=result;

    })

  }
  back(){
    this.navCtrl.pop();
  }
  doAlert() {
    let alert = this.alerCtrl.create({
      title: '我是这样的人儿！',
      message: this._porsonal.user_introduction,
    });
    alert.present()
  }


}
