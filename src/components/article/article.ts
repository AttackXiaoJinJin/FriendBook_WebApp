
import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import {PersondetailPage} from "../../pages/persondetail/persondetail"

@Component({
  selector: 'article',
  templateUrl: 'article.html',

})
export class ArticleComponent {
  @Input() _article: any;
  text: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
  ) {
    console.log('Hello ArticleComponent Component');

  }

  togetuserid(id){

    let modelPage=this.modalCtrl.create(PersondetailPage,{"user_id":id});
       modelPage.present();

  }

}
