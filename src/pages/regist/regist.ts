import { Component } from '@angular/core';

import {UsersService} from "../../providers/users.service";
import {HomePage} from "../home/home";
import {Storage} from "@ionic/storage";
import {ModalController, NavController, ViewController} from "ionic-angular";
import {NotfindPage} from "../notfind/notfind";
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'page-regist',
  templateUrl: 'regist.html',
  providers:[UsersService],
})
export class RegistPage{
  _username:string;
  _username_error:string;
  _password:string;
  _telephone:any;
  _confirm_code:string;
  _qcode:any;
  regist_res_if:boolean;
  regist_res:string;
  confirm_res_if:boolean=false;
  //倒计时是否结束
  if_countover:boolean=false;
  //验证码按钮的value
  yanvalue:any;
  s:any='59';

  constructor(
    private navCtrl: NavController,
    private userSer:UsersService,
    private storage:Storage,
    public modalCtrl:ModalController,
    public viewCtrl:ViewController
  ) { }

  ionViewDidLoad() {
    //初始化界面是 验证码
    this.yanvalue="验证码";
    this.if_countover=false;
  }

  //判断两次密码输入是否一致
  passwordCheck(){
    if(this._password && this._password.length<=20 && this._password.length>=6){
      return true;
    }else{
      return false;
    }
  }
  usernameCheck(){
    if(this._username){
      let length = this.getUTFCodeNum(this._username);
      if(length>=4 && length<=16){
        return false;
      }else {
        this._username_error = '用户名(2-8个汉字/4-16个字符)';
        return true;
      }
    }else{
      this._username_error = '用户名不能为空';
      return true;
    }
  }
  //判断字符数量
  getUTFCodeNum(str) {
    var reg = new RegExp("[\\u4E00-\\u9FFF]","g");
    if(str.match(reg)){
      var newStr = str.replace(reg,'aa');
      return newStr.length;
    }else{
      return str.length;
    }
  }
  gologin(){
    //登录页面
  }

  //随机生成六位数
  makesix(){
    //随机产生六位数验证码
    var range=function(start,end)
    {
      var array=[];
      for(var i=start;i<end;++i) array.push(i);
      return array;
    };
    var randomstr = range(0,6).map(function(x){
      return Math.floor(Math.random()*10);
    }).join('');
    // console.log(randomstr);

    return randomstr;
  }

  countdown(){
    let that=this;
    let d = new Date("1111/1/1,0:00:59");
    that.if_countover=true;
    let interval = setInterval(function () {
      that.s = d.getSeconds();//返回时间的秒。返回值是 0 ~ 59 之间的一个整数。
      that.yanvalue=that.s+"s后重新发送";
      that.s = that.s < 10 ? "0" + that.s : that.s;
      if (that.s == 0) {
        //倒计时结束清除interval
        clearInterval(interval);
        //变成重新发送
        that.yanvalue="重新发送";
        //生成未知的随机六位数
        that._confirm_code=that.makesix();
        // console.log(that._confirm_code);
        //时间到，验证码按钮able
        that.if_countover=false;
      }
      d.setSeconds(that.s - 1);
    },1000)
  }


  toRegist() {
    console.log(this._qcode);
    console.log(this._confirm_code);
    if(this._confirm_code==this._qcode){
      this.confirm_res_if=false;
      let that=this;

      // console.log(that._username);
      // console.log(that._password);
      that.userSer.addUser(that._telephone+'',that._username+'',that._password+'',function (result) {
        console.log(result);
        switch (result.statusCode){
          case 6:
            that.userSer.getIdByPhone(that._telephone+'',function (result) {
              if(result.statusCode){
                //404页面
                that.to404()
              }else{
                that.storage.ready().then(()=>{
                  that.storage.set('isLogin',true);
                  that.storage.set('user_id',result[0].user_id);
                  // this.storage.set('token',result.token);
                  console.log(result[0])
                  // that.viewCtrl.dismiss({"yep":true})
                });

                that.viewCtrl.dismiss();
                // that.navCtrl.pop();
                // that.navCtrl.push(HomePage);
              }
            });
            break;
          case 5:
            that.regist_res_if=true;
            that.regist_res='该用户已存在';
            break;
          default:
            // that.router.navigate(['/**']);
            //404页面
            that.to404()
            break;
        }
      });
    }else{
      this.confirm_res_if=true;
    }
  }


  togetcode(){
    let that=this;
    //倒计时
    that.countdown();
    // that.userSer.sendmessage(that._telephone+'',function (result) {
    // that.userSer.sendmessage(that._telephone+'').then((result)=> {
    that.userSer.sendmessage(that._telephone+'',function(result){
      if(result.yanzheng){
        that._confirm_code=result.yanzheng;
        // console.log(that._confirm_code);
      }
    });
    //==================sendmessage
  }

  to404(){
    let modelPage=this.modalCtrl.create(NotfindPage);
    modelPage.present();
  }

  back(){
    // this.navCtrl.pop();

    this.viewCtrl.dismiss();
    this.navCtrl.push(TabsPage);

  }


}

