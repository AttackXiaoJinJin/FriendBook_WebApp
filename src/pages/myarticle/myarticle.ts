import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UsersService} from "../../providers/users.service";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-myarticle',
  templateUrl: 'myarticle.html',
})
export class MyarticlePage {
  userId:any
  colarts:any
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userSer: UsersService,
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
    this.myPublish(this.userId)
  }

  //去登录
  toLogin(){
    // let modelPage=this.modalCtrl.create(LoginPage);
    // modelPage.present();
  }

  //发表文章列表
  myPublish(userId){
    let that=this
    console.log("aaaaa")
    // this.userSer.showuserput(userId+'').then((result)=> {
    this.userSer.showuserput(userId+'',function(result) {
      console.log(result)
      if(!result.statusCode) {
        console.log(result)
        that.colarts = result;
      }
    });
  }

}
