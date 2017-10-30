import {Component, ElementRef, Renderer} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {TopicsServerProvider} from "../../providers/topics-server";
import {ArticlesService} from "../../providers/articles.service";
import {GlobalPropertyService} from "../../providers/global-property.service";
import {TopicdetailPage} from "../topicdetail/topicdetail";
declare var $:any;

@IonicPage()
@Component({
  selector: 'page-choose',
  templateUrl: 'choose.html',
  providers:[ArticlesService,TopicsServerProvider]
})
export class ChoosePage {
  private editor:any;
  articleContent:any;
  article_title:any;
  article:any;
  alltopics:any;
  topicid:any;
  scroll_top:any;
  full_height:any;
  userid:any;
  tishi:any="发表文章";
  accept_topicid:any;
  formData: FormData;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private  glo:GlobalPropertyService,
              private artSer:ArticlesService,
              private topSer:TopicsServerProvider,
              private el: ElementRef,
              private renderer: Renderer,
              public modalCtrl: ModalController,

  ) {
  }

  ionViewDidLoad() {
    let that=this
    this.formData = new FormData();
    //默认是6
    this.accept_topicid = 6;
    that.userid=6

    //获取所有话题
    that.topSer.alltopics(function (result) {
      that.alltopics=result;
      // console.log(that.accept_topicid);
      if(that.accept_topicid==0){
        that.topicid = result[0].topic_id;
      }else{
        that.topicid = that.accept_topicid;
        // console.log(that.topicid);
        for(var i=0;i<that.alltopics.length;i++){
          if(that.alltopics[i].topic_id==that.accept_topicid){
            $('select')[0].selectedIndex=i;
          }
        }
      }
    });
    this.articleContent=this.navParams.get('article_content');
    this.article_title=this.navParams.get('article_title');
    console.log(this.articleContent)
    console.log(this.article_title)

  }
  //=====================

  //===============================预览图片
  getIamge(fileList: FileList) {
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.formData.append('uploadFile', file, file.name);
      var img=new Image();
      img.src=window.URL.createObjectURL(file);
      var $img=$(img);
      $img.css("width","100%");
      $img.css("height","100%");
      img.onload=function () {
        $("#preview").empty().append($img);
        //释放所占用的内容
        window.URL.revokeObjectURL(img.src);
      };
      console.log(img.src);
    }
  }


  //====================下面获取话题id
  getTopicId(event){
    this.topicid = this.alltopics[event.selectedIndex].topic_id;
  }

  back(){
    this.navCtrl.pop();
  }


  //====================下面是发表文章
  publishArticle() {
    let that=this
     if(!this.formData.get('uploadFile')){
      this.tishi="请上传文章封面！";
    }else{
      this.formData.append('user_id',that.userid);
      this.formData.append('topic_id',that.topicid);
      this.formData.append('article_content',that.articleContent);
      this.formData.append('article_title',that.article_title);
      // console.log("aaaaaaaaaa")
      this.artSer.insertArticle(this.formData, function (result) {
        // console.log(JSON.stringify(result)+"结果")
        // console.log(that.userid)
        // console.log(that.topicid)
        // console.log(that.articleContent)
        // console.log(that.article_title)
        if(result.statusCode==8){
            let modelPage=that.modalCtrl.create(TopicdetailPage,{"topic_id":that.topicid});
            modelPage.present();
            console.log("eeee");

        }else{
          // that.router.navigate(['/**']);
        }
      });
    }
  }


}
