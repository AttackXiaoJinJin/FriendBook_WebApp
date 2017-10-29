import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import {TopicsServerProvider} from "../../providers/topics-server"
import {Storage} from "@ionic/storage";


@IonicPage()
@Component({
  selector: 'page-topicdetail',
  templateUrl: 'topicdetail.html',
  providers:[TopicsServerProvider]
})
export class TopicdetailPage {
  article: string = "热门";
  isAndroid: boolean = false;
  _Hotarticles:any;
  _Collectarticles: any;
  _Newarticles: any;
  _topic:any;
  atten_if:boolean=false;
  constructor(
    platform: Platform,
              public navCtrl: NavController,
              public navParams: NavParams,
              public topicSer:TopicsServerProvider,
              public viewCtrl:ViewController,
              private storage:Storage
    ) {
        this.isAndroid = platform.is('android');
  }

  back(){
    let id=this.navParams.get('topic_id');
    this.viewCtrl.dismiss({"topic_id":id,"atten_if":this.atten_if});
  }
  ionViewWillEnter(){
    // set a key/value
    //this.storage.set('user_id', '18');



  }
  ionViewDidLoad() {
    let that=this;
    let id=this.navParams.get('topic_id');
    that.storage.get('user_id').then((val) => {
      if(val){
       that.topicSer.showatten(val+'',id+'',function (result) {
          if(result.statusCode==66){
            that.atten_if=true;
          }else{
            that.atten_if=false;
          }
        })
      }
    })
    let str ='{"topic_id":'+id+'}';
    let topic_id = JSON.parse(str);
    //=================获取话题信息
    that.topicSer.getTopicById(topic_id,function (result) {
      // console.log(result[0][0].topic_content);
      that._topic = result[0][0];
      if(!result[0][0].attent_num){
        result[0][0].attent_num=0;
      }
      if(!result[0][0].article_num){
        result[0][0].article_num=0;
      }
    });


      that.topicSer.getHotArticleById(topic_id , function (result) {
      that. _Hotarticles = result[0];

    });
      that.topicSer.getCollectAritcleByld(topic_id, function (result) {
      that._Collectarticles = result[0];
      // console.log(that._Collectarticles);
    });
    that.topicSer.getNewAritcleByld(topic_id, function (result) {
      that._Newarticles = result[0];
    });



    };



  //===============点击关注话题
  attentopic(topic_id){
    let that=this;
    that.storage.ready().then(() => {
      that.storage.get('user_id').then((val) => {
        if(val){
          let str='{"topic_id":'+ topic_id +',"user_id":'+val+'}';
          let topicatten=JSON.parse(str);
          // console.log(topicatten);
          if(!this.atten_if){
            //加关注
            that._topic.attent_num+=1;
            that.topicSer.insertatten(topicatten,function (result) {
              if(result.statusCode==69){
                //插入话题成功
                that.atten_if=true;
              }
              // else
                // that.router.navigate(['/**']);
            })
          }
          else {
            that._topic.attent_num-=1;
            that.topicSer.deleteattent(topicatten,function (result) {
              if(result.statusCode==71){ //删除话题成功
                that.atten_if=false;
              }
              else {
                // that.router.navigate(['/**']);
              }
            })
          }
        }
        else {
        }
      })
    });
  }

}
