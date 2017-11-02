import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {MyorderPage} from "../myorder/myorder";
import {OrdersService} from "../../providers/orders.service";

@IonicPage()
@Component({
  selector: 'page-returnmoney',
  templateUrl: 'returnmoney.html',
})
export class ReturnmoneyPage {
  order_id:any
  _refund:any
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public OrdersService:OrdersService,
    public modalCtrl:ModalController,
    public viewCtrl: ViewController,



  ) {
  }

  ionViewDidLoad() {
    let that=this
    this.order_id=this.navParams.get('order_id');
    this.OrdersService.showorderbyid(this.order_id+'',function (result) {
      that._refund=result[0];

    })


  }

  cancel(){
    let that=this
    this.OrdersService.delOrder(this.order_id+'',function (result) {
      if(result.statusCode==93){
        that.viewCtrl.dismiss();
        const modelPage=that.modalCtrl.create(MyorderPage);
        modelPage.present();
      }
      else {
        alert("删除不成功");
      }
    })
  }

  back(){
    this.navCtrl.pop()
  }


}
