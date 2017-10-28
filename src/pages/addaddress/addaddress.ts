import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

/**
 * Generated class for the AddaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addaddress',
  templateUrl: 'addaddress.html',
})
export class AddaddressPage {
  loginForm: FormGroup;
  telPhone: any;
  ContacterName:any;
  detailaddress:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      //login
      telPhone: ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11), Validators.required, Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")])],
       ContacterName: ['', Validators.compose([Validators.required, Validators.maxLength(6)])],
      detailaddress: ['', Validators.compose([Validators.required, Validators.minLength(12)])]
    });
    this.telPhone = this.loginForm.controls['telPhone'];
    this.ContacterName= this.loginForm.controls['ContacterName'];
    this.detailaddress= this.loginForm.controls['detailaddress'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddaddressPage');
  }
  back(){
    this.navCtrl.pop();
  }
}
