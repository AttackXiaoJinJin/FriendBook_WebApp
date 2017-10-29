import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {OrdersService} from "../../providers/orders.service";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-myorder',
  templateUrl: 'myorder.html',
})
export class MyorderPage {
  _orders:any;
  userId:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private OrdersService: OrdersService,
    private storage:Storage,
    public viewCtrl: ViewController,
  ) {
  }

  ionViewDidLoad() {
    this.storage.ready().then(() => {
      this.storage.get('user_id').then((val) => {
        this.userId = val;
        this.myOrder(this.userId);
      })
    });
  }
  //订单列表
  myOrder(userId){
  // this.OrdersService.showOrder(userId+'').then((result)=> {
    this.OrdersService.showOrder(userId+'',result=>{
      if(!result.statusCode) {
        this._orders = result;
      }
    });
  }
  back(){
    this.viewCtrl.dismiss();
  }
}
