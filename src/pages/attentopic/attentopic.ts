import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController ,ModalController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UsersService } from '../../providers/users.service';
import {TopicsServerProvider} from "../../providers/topics-server";
import {LoginPage} from "../login/login";
import {TopicdetailPage} from "../topicdetail/topicdetail";
@IonicPage()
@Component({
  selector: 'page-attentopic',
  templateUrl: 'attentopic.html',
})
export class AttentopicPage {
  user_id:any;
  _topics:any;
  islogin:any=false
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private storage:Storage,
    private userSer:UsersService,
    private TopicService:TopicsServerProvider,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttentopicPage');
    this.storage.ready().then(() => {
      this.storage.get('user_id').then((val) => {
        if(val){
          this.islogin=true;
        this.user_id = val;
        this.getAtten(val);
      }else{
          this.islogin=false;
        }

      })
    });
  }

  //获取关注话题
  getAtten(userid){
    let str = '{"user_id":' + userid + '}';
    let user_id = JSON.parse(str);
    this.userSer.getUserTopics(user_id,result=> {
      if(!result.statusCode) {
        this._topics = result[0];
      }
      // console.log(this._topics);
    });
  }

  //取消关注话题
  cancelAtten(topic_id){
    let str='{"topic_id":'+ topic_id +',"user_id":'+this.user_id+'}';
    let topic=JSON.parse(str);
    this.TopicService.deleteattent(topic,result=> {
      if(result.statusCode==71){ //删除话题成功
        this.userSer.getUserTopics(topic,result=> {
          if(!result.statusCode) {
            this._topics = result[0];
          }else{
            this._topics = [];
          }
        });
      }else {
        let toast = this.toastCtrl.create({
          message: '服务器异常',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    })
  }
  back(){
    this.viewCtrl.dismiss();
  }

  totopicdetail(topic_id){
    let modelPage=this.modalCtrl.create(TopicdetailPage,{"topic_id":topic_id});
    modelPage.present();

  }
}
