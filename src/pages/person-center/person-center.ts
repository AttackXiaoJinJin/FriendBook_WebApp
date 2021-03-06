import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {UsersService} from '../../providers/users.service';
import {LoginPage} from '../login/login';
import {SettingPage} from "../setting/setting";
import {AddressPage} from "../address/address";
import {LovebookPage} from "../lovebook/lovebook";
import {AttentopicPage} from "../attentopic/attentopic";
import {MyarticlePage} from "../myarticle/myarticle";
import {MycollectPage} from "../mycollect/mycollect";
import {MyorderPage} from "../myorder/myorder";
import {ReplyPage} from "../reply/reply";
import {RegistPage} from "../regist/regist";

@IonicPage()
@Component({
  selector: 'page-person-center',
  templateUrl: 'person-center.html',
})
export class PersonCenterPage {
  user_id:any;
  _user:any;
  islogin:any
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage:Storage,
    private userSer:UsersService,
    public modalCtrl:ModalController,
    private toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    // this.storage.ready().then(() => {
    //   this.storage.get('user_id').then((val) => {
    //     if(val){
    //       this.user_id = val;
    //       this.getBaseInformation(val);
    //       this.islogin=true
    //     }else{
    //       this.islogin=false
    //       // this.navCtrl.push(LoginPage)
    //       // const modelPage=this.modalCtrl.create(LoginPage);
    //       // modelPage.present();
    //     }
    //   })
    // });
  }
  ionViewDidEnter(){
    this.storage.ready().then(() => {
      this.storage.get('user_id').then((val) => {
        if(val){
          this.user_id = val;
          this.getBaseInformation(val);
          this.islogin=true
        }else{
          this.islogin=false
          this.navCtrl.push(LoginPage)
        }
      })
    });
  }


  //获取基本信息
  getBaseInformation(userid){
    let str = '{"user_id":' + userid + '}';
    let user = JSON.parse(str);
    this.userSer.getBaseById(user,result => {
      if(result.statusCode){
        let toast = this.toastCtrl.create({
          message: '服务器异常',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }else{
        this._user = result[0];
      }
    });
  }
  // =========================================================获取基本信息


  //ToSetting
  toSetting(){
    // const modelPage=this.modalCtrl.create(SettingPage);
    // modelPage.present();
    this.navCtrl.parent.select(0)
    this.storage.ready().then(()=>{
      // this.storage.remove('isLogin');
      this.storage.remove('user_id');
      // this.viewCtrl.dismiss();
      // this.navCtrl.push(PersonCenterPage)
    });

  }
  // =========================================================ToSetting


  //ToAddress
  toAddress(){
    const modelPage=this.modalCtrl.create(AddressPage);
    modelPage.present();
  }
  // =========================================================ToAddress


  //ToAtten
  toAtten(){
    const modelPage=this.modalCtrl.create(AttentopicPage);
    modelPage.present();
  }
  // =========================================================ToAtten


  //ToLove
  toLove(){
    const modelPage=this.modalCtrl.create(LovebookPage);
    modelPage.present();
  }
  // =========================================================ToLove


  //ToCollect
  toCollect(){
    const modelPage=this.modalCtrl.create(MycollectPage);
    modelPage.present();
  }
  // =========================================================ToCollect


  //ToMessage
  toMessage(){
    const modelPage=this.modalCtrl.create(ReplyPage);
    modelPage.present();
  }
  // =========================================================ToMessage


  //ToMyArticle
  toMyArticle(){
    const modelPage=this.modalCtrl.create(MyarticlePage);
    modelPage.present();
  }
  // =========================================================ToMyArticle


  //ToOrder
  toOrder(){
    const modelPage=this.modalCtrl.create(MyorderPage);
    modelPage.present();
  }
  // =========================================================ToOrder

  toLogin(){
     const modelPage=this.modalCtrl.create(LoginPage);
     modelPage.present();
  }
  //注册
  toRegist(){
    let modelPage=this.modalCtrl.create(RegistPage);
    modelPage.present();
  }


}
