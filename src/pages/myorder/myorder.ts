import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {OrdersService} from "../../providers/orders.service";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-myorder',
  templateUrl: 'myorder.html',
})
export class MyorderPage {
  _orders:any;
  userId:any
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private OrdersService: OrdersService,
              private storage:Storage,
              ) {
  }

  ionViewDidLoad() {
    //判断是否登录
    // if(!this.storage.get('user_id')){
    //     this.toLogin()
    // }else{
    //   this.userId=this.storage.get('user_id')
    // }
    this.userId=6
    this.myOrder(this.userId)
  }

  //去登录
  toLogin(){
    // let modelPage=this.modalCtrl.create(LoginPage);
    // modelPage.present();
  }
  //订单列表
  myOrder(userId){
  // this.OrdersService.showOrder(userId+'').then((result)=> {
  this.OrdersService.showOrder(userId+'',function(result) {
    console.log(result);
    if(!result.statusCode) {
      this._orders = result;
    }
  });
}
}
