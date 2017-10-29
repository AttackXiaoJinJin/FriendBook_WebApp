import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ToastController } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';
import {TopicsServerProvider} from "../../providers/topics-server"
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-topics',
  templateUrl: 'topics.html',
  providers:[TopicsServerProvider]
})
export class TopicsPage {

    topics:any;
    items = [];
  pageNum:number = 0;
  pageSize:number = 10;
  noMore:boolean = false;
    constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public modalCtrl: ModalController,
     public topicSer:TopicsServerProvider,
     public platform: Platform,
     private storage:Storage,
     private toastCtrl: ToastController,
     public actionSheetCtrl: ActionSheetController
  ) {

  }

  ionViewDidLoad() {

   let that=this;

    this.topicSer.getAlltopics(function (result) {

      if (result ){
            that.topics=result[0];
            // that.items=that.topics.slice(that.num,that.num+10);
            that.items =that.topics.slice(that.pageNum * that.pageSize,(that.pageNum+1) * that.pageSize);
            that.pageNum = that.pageNum+1;
          }
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
              that.items = result[0];

            });
          }
        },{
          text: '按热门排序',
          handler: () => {
            let that=this;
            that.topicSer.getMattentopic(function (result) {
              that.items= result[0];
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

  doInfinite(infiniteScroll){
    console.log('Begin async operation');
    return new Promise((resolve) => {
      setTimeout(() => {
        // console.log(this.topics);
        this.items.push(...this.topics.slice(this.pageNum * this.pageSize,(this.pageNum+1) * this.pageSize));
        this.pageNum = this.pageNum+1;
        if((this.topics.length / this.pageSize) <= this.pageNum -1){
           this.noMore=true;
          infiniteScroll.enable(false);
        }
        resolve();
      }, 500);
    })
  }

  alert_tip(){
    let toast = this.toastCtrl.create({
      message: '服务器异常',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
