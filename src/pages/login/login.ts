import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,ToastController,App, ViewController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import {UsersService} from '../../providers/users.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import 'rxjs/add/operator/toPromise';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[UsersService]
})
export class LoginPage {
  loginForm: FormGroup;
  username: any;
  password: any;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private viewCtrl: ViewController,
    private appCtrl: App,
    private storage:Storage,
    private userSer:UsersService,
    private formBuilder: FormBuilder
  ) {
        this.loginForm = formBuilder.group({
          loginPhone: ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11), Validators.required, Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")])],
          loginPasswd: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
        this.username = this.loginForm.controls['loginPhone'];
        this.password = this.loginForm.controls['loginPasswd'];
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(user) {
    this.userSer.login(user,(result)=> {
      if(result){
        if(result.statusCode){
          let toast = this.toastCtrl.create({
            message: '用户名或密码错误',
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }else {
          this.storage.ready().then(() => {
            this.storage.set('user_id', result[0].user_id);
          });
          this.navCtrl.push(TabsPage);
        }
      }else{
        let toast = this.toastCtrl.create({
          message: '服务器异常',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    });
  }
}