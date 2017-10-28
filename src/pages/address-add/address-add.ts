import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, ToastController } from 'ionic-angular';
import {AddressAddcityPage} from "../address-addcity/address-addcity";
import { Storage } from '@ionic/storage';
import { ReceiveService } from '../../services/receive.service';

/**
 * Generated class for the AddressAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address-add',
  templateUrl: 'address-add.html',
})
export class AddressAddPage {
  user_id:any;
  receive_name:any;
  receive_phone:any;
  add_detail:any;
  address:any;
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public modalCtrl:ModalController,
    private toastCtrl: ToastController,
    private storage:Storage,
    private ReceiveService:ReceiveService,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressAddPage');
    this.storage.ready().then(() => {
      this.storage.get('user_id').then((val) => {
        this.user_id = val;
      })
    });
  }

  back(){
    this.viewCtrl.dismiss();
  }

  toCity(){
    const modelPage=this.modalCtrl.create(AddressAddcityPage);
    modelPage.onDidDismiss(data =>{
      if(data && data.add){
        this.address = data.add;
      }
    });
    modelPage.present();
  }
  saveAddress(){
    if(!this.receive_name){
      this.alert_tip('收货人不能为空');
    } else if(!this.checkphone()){
      this.alert_tip('请填写正确手机号');
    }else if(!this.address){
      this.alert_tip('请选择所在地区');
    }else if(!this.add_detail){
      this.alert_tip('请填写详细地址');
    }else{
      let str = '{"user_id":' + this.user_id + ',"receive_name":"'+this.receive_name+'","receive_address":"'+this.address+this.add_detail+'","receive_phone":"'+this.receive_phone+'"}';
      let add = JSON.parse(str);
      this.ReceiveService.addAddress(add,result=> {
        if(result.statusCode==103) {
          this.viewCtrl.dismiss();
        }else{
          this.alert_tip('服务器异常')
        }
      });
    }
  }


  //手机号验证
  checkphone(){
    let reg = /^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$/;
    return reg.test(this.receive_phone);
  }


  //提示错误
  alert_tip(str){
    let toast = this.toastCtrl.create({
      message: str,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
