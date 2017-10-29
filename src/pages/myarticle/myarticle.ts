import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
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
              public viewCtrl: ViewController,
              ) {
  }

  ionViewDidLoad() {
    this.storage.ready().then(() => {
      this.storage.get('user_id').then((val) => {
        this.userId = val;
        this.myPublish(this.userId);
      })
    });
  }

  //发表文章列表
  myPublish(userId){
    // this.userSer.showuserput(userId+'').then((result)=> {
    this.userSer.showuserput(userId+'',result=> {
      console.log(result);
      if(!result.statusCode) {
        console.log(result);
        this.colarts = result;
      }
    });
  }
  back(){
    this.viewCtrl.dismiss();
  }
}
