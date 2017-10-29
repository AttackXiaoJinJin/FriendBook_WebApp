import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AddressAddPage } from '../address-add/address-add'
import {ReceiveService} from "../../providers/receive.service";

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
  _address:any;
  user_id:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private storage:Storage,
    private ReceiveService:ReceiveService,
    private toastCtrl: ToastController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');
  }
  ionViewWillEnter(){
    this.storage.ready().then(() => {
      this.storage.get('user_id').then((val) => {
        this.user_id=val;
        this.getAddress(val)
      })
    });
  }

  getAddress(userid){
    let str = '{"user_id":' + userid + '}';
    let user_id = JSON.parse(str);
    this.ReceiveService.showAddress(user_id,result=> {
      if(!result.statusCode) {
        this._address = result;
      }else if(result.statusCode==98){
        this._address = [];
      }else{
        this.alert_tip();
      }
      // console.log(this._address);
    });
  }

  deleteAddress(receive_id){
    let str = '{"receive_id":' + receive_id + '}';
    let receiveid = JSON.parse(str);
    this.ReceiveService.delAddress(receiveid,result=> {
      if(result.statusCode==101) { //删除收货地址成功
        this.getAddress(this.user_id);
      }else {
        this.alert_tip();
      }
    });
  }

  back(){
    this.viewCtrl.dismiss();
  }
  alert_tip(){
    let toast = this.toastCtrl.create({
      message: '服务器异常',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  toAdd(){
    this.navCtrl.push(AddressAddPage);
  }
}
