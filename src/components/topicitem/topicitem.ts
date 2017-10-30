import { Component,Input} from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import {TopicsServerProvider} from "../../providers/topics-server"
import {TopicdetailPage} from "../../pages/topicdetail/topicdetail"
import { Platform, ActionSheetController } from 'ionic-angular';
/**
 * Generated class for the TopicitemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'topicitem',
  templateUrl: 'topicitem.html',
  providers:[TopicsServerProvider]
})
export class TopicitemComponent {

  @Input() _topic: any;
  atten_if:boolean=false;
  text: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public topicSer:TopicsServerProvider,
    public platform: Platform,
    public actionSheetCtrl: ActionSheetController

  ) {
  }
  ngOnInit() {
    let that=this;
    let str = '{"user_id":'+18+'}';
    let user_id= JSON.parse(str);
    // console.log(that._topic);
    that.topicSer.showallattent(user_id,function (res) {
      for(let i=0;i<res.length;i++){
        if(res[i].topic_id==that._topic.topic_id){
          that.atten_if=true;
        }
      }
    })
  }
  toTdetail(id){
    console.log("M");
    let that=this;
    let modelPage=this.modalCtrl.create(TopicdetailPage,{"topic_id":id,"atten_if":that.atten_if});
    modelPage.onDidDismiss(data => {
      if(data.tougao){
        this.navCtrl.parent.select(2);
      }else{
        if(data.atten_if){ //true
          that.atten_if=data.atten_if
          that._topic.attent_num+=1
        } else {
          that.atten_if=data.atten_if
          that._topic.attent_num-=1
        }
      }
    });
    modelPage.present();
  }

  //关注话题
  attentopic(topic_id){
    //如果已登录
    let that=this;
    let str='{"topic_id":'+ topic_id +',"user_id":'+18+'}';
    let topicatten=JSON.parse(str);
    // console.log(topicatten);
    if(!this.atten_if){  //加关注
      that.topicSer.insertatten(topicatten,function (result) {
        if(result.statusCode==69){//插入话题成功
          that.atten_if=true;
          that._topic.attent_num+=1;
        }
        // else
          // that.router.navigate(['/**']);
      })
    }
    //取消关注
    else {
    that.topicSer.deleteattent(topicatten,function (result) {

      if(result.statusCode==71){ //删除话题成功
        that.atten_if=false;
        that._topic.attent_num-=1;

      }
      else {
        //删除失败
        // that.router.navigate(['/**']);
      }
    })
    }


  }
}
