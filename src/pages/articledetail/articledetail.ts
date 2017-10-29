import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import {ArticlesService} from "../../providers/articles.service"
import {CommentsService} from "../../providers/comments.service";
import {RecommentsService} from "../../providers/recomments.service";
import {Storage} from "@ionic/storage";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
declare var $:any;
@IonicPage()
@Component({
  selector: 'page-articledetail',
  templateUrl: 'articledetail.html',
  providers:[ArticlesService,CommentsService]
})
export class ArticledetailPage {
  userId:any
  //文章信息
  article:any;
  artid: any;
  //插入评论
  articlecomment: any;
  //评论的json数组
  comments: any;
  comment_if: boolean;
  collectNum:any
  collect_if:any
  if_show:boolean=false;
  if_recom: boolean;
  recomments:any;
  //回复内容
  recontent:any;

  //form表单验证
  commentForm: FormGroup;
  _com_centent:any;

  _arecom_id:any;
  recomment_input:boolean = false;
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public articlesSer:ArticlesService,
    private CommentsService:CommentsService,
    private RecommentsService:RecommentsService,
    private storage:Storage,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder
  ) {
    this.commentForm = formBuilder.group({
      comment_centent: ['', Validators.compose([Validators.required])],
    });
    this._com_centent = this.commentForm.controls['comment_centent'];
  }

  ionViewDidLoad() {
    this.artid=this.navParams.get('article_id');
    this.getartdetail();
    this.getComments();
    this.storage.ready().then(() => {
      this.storage.get('user_id').then((val) => {
        this.userId = val;
        this.showIfCollect(val);
      })
    });
  }

  getartdetail(){
    this.articlesSer.getArticleDetail(this.artid+'',(result)=>{
      if(result.statusCode){
        this.alert_tip()
      }else {
        this.article=result[0][0];
        $(".articledetail").html((this.article).article_content);
      }
    })
  }

  //========获取评论
  getComments(){
    this.CommentsService.getArticleComments(this.artid+'',(result)=> {
      //console.log(JSON.stringify(result)+"这是文章评论");
      //如果返回错误状态码并且返回结果为null
      if (result.statusCode || !result.length) {
        this.comment_if=false;
      }else {
        this.comment_if=true;
        this.comments = result[0];
      }
    });
  }

  //显示是否收藏
  showIfCollect(userid){
    this.articlesSer.showcollect(userid + '',this.artid + '',(result)=> {
      //45表示已收藏
      if (result.statusCode == 45) {
        this.collect_if = true;
      } else {
        this.collect_if = false;
      }
    });
  }
  //评论该文章
  artcomment(){
    if(this.recomment_input){
      this.RecommentsService.addartrecoms(this.userId+'',this.articlecomment+'',this._arecom_id+'',result=> {
        //插入成功
        if (result.statusCode == 121) {
          this.articlecomment='';
          this.recomment_input = false;
          this.getComments();
        } else {
          this.alert_tip()
        }
      });
    }else {
      this.CommentsService.addArticleComments(this.articlecomment+'',this.artid+'',this.userId+'',(result)=> {
        if (result.statusCode==25) {
          //评论成功后将评论框中的内容清空
          this.articlecomment='';
          this.getComments();
        }else {
          this.alert_tip();
        }
      });
    }
  }

  //改变收藏状态
  CollectArticle(){
    if(!this.collect_if){
      this.articlesSer.insertcoll(this.userId + '', this.artid + '',result=> {
        if (result.statusCode==48) {
          this.collect_if=true;
        }else {
          this.alert_tip();
        }
      });
    }else{//取消收藏
      this.articlesSer.deletecoll(this.userId + '', this.artid + '',result=>{
        if (result.statusCode==50) {
          this.collect_if=false;
        }else {
          this.alert_tip();
        }
      });
    }
  }
  ReArtComment(arecom_id){
    this._arecom_id = arecom_id;
    this.recomment_input = true;
    $('#artcomment_input')[0].focus();
  }
  blurComment(e){
    if(e.target.nodeName.toLocaleLowerCase()=="a"&&e.target.innerHTML=="回复"){

    }else{
      this.recomment_input = false;
    }
  }

  //返回
  back(){
    this.viewCtrl.dismiss();
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
