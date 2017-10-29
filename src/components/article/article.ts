
import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import {PersondetailPage} from "../../pages/persondetail/persondetail"
import {ArticledetailPage} from "../../pages/articledetail/articledetail";

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

  }
  toArticleDetail(e,article_id){
    if(e.target.className=="touxiangimg"){

    }else{
      let modelPage=this.modalCtrl.create(ArticledetailPage,{"article_id":article_id});
      modelPage.present();
    }
  }
  togetuserid(id){
    let modelPage=this.modalCtrl.create(PersondetailPage,{"user_id":id});
    modelPage.present();
  }
}
