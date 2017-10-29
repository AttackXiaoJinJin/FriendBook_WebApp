import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {UsersService} from "../../providers/users.service";
import {Storage} from "@ionic/storage";


@IonicPage()
@Component({
  selector: 'page-mycollect',
  templateUrl: 'mycollect.html',
})
export class MycollectPage {
  userId:any;
  colarts:any;
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
        this.myCollect(this.userId);
      })
    });
  }

  //收藏文章列表
  myCollect(userId){
    this.userSer.getUserArticles(userId+'',result=>{
      if(!result.statusCode) {
        this.colarts = result[0];
      }
    });
  }
  back(){
    this.viewCtrl.dismiss();
  }
}
