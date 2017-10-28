import { Component } from '@angular/core';
import { NavController,NavParams,ModalController } from 'ionic-angular';
import {ArticledetailPage} from "../articledetail/articledetail";
import {PayPage} from "../pay/pay";
import {LineitemPage} from "../lineitem/lineitem";
import {ReturnmoneyPage} from "../returnmoney/returnmoney";
import {ReturnsuccessPage} from "../returnsuccess/returnsuccess"

@Component({
  selector: 'page-books',
  templateUrl: 'books.html'
})
export class BooksPage {

  constructor(
    public navCtrl: NavController,
    public modalCtrl:ModalController,
    public navParams: NavParams,) {



  }
  ionViewDidLoad() {
    const modelPage=this.modalCtrl.create(PayPage);
    // const modelPage=this.modalCtrl.create(ArticledetailPage);
    modelPage.present();
  }


}
