import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';
import {TopicsServerProvider} from "../../providers/topics-server"
import {TopicdetailPage} from "../topicdetail/topicdetail";

/**
 * Generated class for the TopicsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-topics',
  templateUrl: 'topics.html',
  providers:[TopicsServerProvider]
})
export class TopicsPage {

    topics:any;
    items = [];
    num:number=0
    constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public modalCtrl: ModalController,
     public topicSer:TopicsServerProvider,
     public platform: Platform,
     public actionSheetCtrl: ActionSheetController
  ) {

  }
  // ionViewWillEnter(){
  //   let that=this;
  //   let str = '{"user_id":'+18+'}';
  //   let user_id= JSON.parse(str);
  //   this.topicSer.getAlltopics().then(function (result) {
  //     that.topics=result[0];
  //     that.items=that.topics.slice(0,4);
  //     // console.log(that.topics);
  //   })
  // }

  ionViewDidLoad() {

   let that=this;

    let str = '{"user_id":'+18+'}';
    let user_id= JSON.parse(str);
    this.topicSer.getAlltopics().then(function (result) {
      that.topics=result[0];
      // console.log(that.topics);
    })

  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({

      buttons: [
        {
          text: '按推荐排序',
          handler: () => {
            let that=this;
            that.topicSer.getMarticletopic(function (result) {
              that.topics = result[0];

              // that._pages = Math.ceil(that._Marticle.length / that._pagesize);
            });
          }
        },{
          text: '按热门排序',
          handler: () => {
            let that=this;
            that.topicSer.getMattentopic(function (result) {
              that.topics= result[0];
            });
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  // doInfinite(infiniteScroll) {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       let item= {
  //         "id": 13,
  //         "name": "前端开发",
  //         "salary": "15k-30k",
  //         "education": "本科",
  //         "publish_date": "2017-06-24T01:12:30.000Z",
  //         "years_working": "经验3-5年",
  //         "city_name": "杭州市",
  //         "company_name": "创意网",
  //         "profession_name": "移动互联网"
  //       };
  //       this.items.push(item);
  //       infiniteScroll.enable(false);
  //       resolve();
  //     }, 500);
  //   })
  //
  // }
}
