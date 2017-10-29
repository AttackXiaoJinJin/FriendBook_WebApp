import {Component, Input} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {UsersService} from "../../providers/users.service";
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-reply',
  templateUrl: 'reply.html',
})
export class ReplyPage {
  replyme: string = "book";
  isAndroid: boolean = false;
  //用户Id
  userId:any
  //书籍的回复
  bookrecomments: any;
  //文章回复
  artrecomments: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userSer:UsersService,
              public platform: Platform,
              private storage:Storage,
              public viewCtrl: ViewController,

              ) {
    this.isAndroid = platform.is('android');
  }

  ionViewDidLoad() {
    this.storage.ready().then(() => {
      this.storage.get('user_id').then((val) => {
        this.userId = val;
        //这本书的回复,评论
        this.recomment(this.userId);
        this.artrecomment(this.userId);
      })
    });
  }


  //1.
  //=============书籍回复
  recomment(userId){
    let that=this;
    // that.userSer.getuserbkrecoms(userId+'').then((result)=> {
    that.userSer.getuserbkrecoms(userId+'',function(result) {
      if(!result.statusCode) {
        that.bookrecomments = result;
      }
    });
  }


  //3.
  //============文章回复
  artrecomment(userId){
    let that=this;
    // that.userSer.getuserartrecoms(userId+'').then((result)=> {
    that.userSer.getuserartrecoms(userId+'',function(result) {
      if(!result.statusCode) {
        that.artrecomments = result;
        // console.log(that.artrecomments)
      }
    });
  }


  back(){
    this.viewCtrl.dismiss();
  }
}
