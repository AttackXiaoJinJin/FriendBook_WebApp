import {Component, Input} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {UsersService} from "../../providers/users.service";

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
              platform: Platform

              ) {
    this.isAndroid = platform.is('android');
  }

  ionViewDidLoad() {
    //判断登录
    // if(!this.storage.get('user_id')){
    //     this.toLogin()
    // }else{
    //   this.userId=this.storage.get('user_id')
    // }
    this.userId=6
    //这本书的回复,评论
    this.recomment(this.userId)
    this.artrecomment(this.userId)

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
      console.log(result)
      console.log(result.statusCode)
      if(!result.statusCode) {
        that.artrecomments = result
        console.log(that.artrecomments)
      }
    });
  }

}
