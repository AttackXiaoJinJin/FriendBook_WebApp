import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AddressAddcityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address-addcity',
  templateUrl: 'address-addcity.html',
})
export class AddressAddcityPage {
  province_info:any=[];
  city_info:any = {'江苏省':['苏州市','南通市','无锡市','南京市','常州市'],'上海市':['虹桥区','浦东区'],'浙江省':['金华市','宁波市','杭州市'],};
  province_if:boolean = false;
  choose_province:any;
  address:string="";
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressAddcityPage');

    for(var Key in this.city_info){
      this.province_info.push(Key);
    }
    // console.log(this.province_info);
  }

  choseProvince(e){
    this.choose_province=e.target.innerHTML;
    this.address+=e.target.innerHTML;
    this.province_if = true;

  }

  choseCity(e){
    this.address+=e.target.innerHTML;
    this.viewCtrl.dismiss({"add":this.address});
  }
  back(){
    this.viewCtrl.dismiss();
  }

}
