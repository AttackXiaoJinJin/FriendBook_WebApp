import { Component,Input} from '@angular/core';
import {  NavController, NavParams,ModalController} from 'ionic-angular';
import {TopicsServerProvider} from "../../providers/topics-server"
import {TopicdetailPage} from "../../pages/topicdetail/topicdetail"
import { Platform} from 'ionic-angular';
import {Storage} from "@ionic/storage"
import {LoginPage} from "../../pages/login/login"
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
  atten_if: boolean = false;
  text: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public topicSer: TopicsServerProvider,
              public platform: Platform,
              private storage: Storage,) {
  }

  ngOnInit() {
    let that = this;
    that.storage.get('user_id').then((val) => {
      if (val) {
        let str = '{"user_id":' + val + '}';
        let user_id = JSON.parse(str);
        that.topicSer.showallattent(user_id, function (res) {
          for (let i = 0; i < res.length; i++) {
            if (res[i].topic_id == that._topic.topic_id) {
              that.atten_if = true;
            }
          }
        })
      }

    })
  }

  toTdetail(id) {
    console.log("M");
    let that = this;
    let modelPage = this.modalCtrl.create(TopicdetailPage, {"topic_id": id, "atten_if": that.atten_if});
    modelPage.onDidDismiss(data => {
      if (data.tougao) {
        this.navCtrl.parent.select(2);
      } else {
        if (data.atten_if) { //true
          that.atten_if = data.atten_if
          that._topic.attent_num += 1
        } else {
          that.atten_if = data.atten_if
          that._topic.attent_num -= 1
        }
      }
    });
    modelPage.present();
  }

  //关注话题
  attentopic(topic_id) {
    let that = this;
    that.storage.get('user_id').then((val) => {
      if (val) {
        let str = '{"topic_id":' + topic_id + ',"user_id":' + val + '}';
        let topicatten = JSON.parse(str);
        // console.log(topicatten);
        if (!this.atten_if) {  //加关注
          that.topicSer.insertatten(topicatten, function (result) {

            if (result.statusCode == 69) {//插入话题成功
              that.atten_if = true;
              that._topic.attent_num += 1;
            }

          })
        }
        //取消关注
        else {
          that.topicSer.deleteattent(topicatten, function (result) {

            if (result.statusCode == 71) { //删除话题成功
              that.atten_if = false;
              that._topic.attent_num -= 1;

            }
            else {

            }
          })
        }
      }
      else {
        let modelPage = that.modalCtrl.create(LoginPage);
        modelPage.present();
      }
    })

  }

}
