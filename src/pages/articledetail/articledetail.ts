
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ArticlesService} from "../../providers/articles.service"
import {CommentsService} from "../../providers/comments.service";
import {Storage} from "@ionic/storage";
// import { Router } from '@angular/router';
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
  className:any;
  collectName:any;
  like_num:any;
  like_if=false;
  _comment:any;
  answer:any;
  if_show:boolean=false;
  if_recom: boolean;
  recomments:any;
  //登录的用户的id
  userid:any;
  //回复内容
  recontent:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public articlesSer:ArticlesService,
    private CommentsService:CommentsService,
    private storage:Storage
    ) {
  }

  ionViewDidLoad() {
    this.storage.set('user_id',6)
    this.artid=2
    this.getartdetail(this.artid)
    this.getComments(this.artid)
    let that=this
    this.userId= this.storage.get('user_id')
    console.log(JSON.stringify(this.userId)+"idddd")

    //显示收藏数
    this.showCollectNum(that);
    //===============显示收藏
    this.showIfCollect(that);

  }

  getartdetail(art_id){
    let that=this
    this.articlesSer.getArticleDetail(art_id+'').then((result)=>{
      if(result[0][0].statusCode){
        //console.log(result[0][0].statusCode+"这是statusCode");
        // ==========404

      }else {
        that.article=result[0][0];
        // console.log(that.article);
        $(".articledetail").html((that.article).article_content);
        // $(".articledetail")[0].html((that.article).article_content);

      }
    })
  }

  //========获取评论
  getComments(articleId){
    let that=this
    that.CommentsService.getArticleComments(articleId+'').then(
      (result)=> {
      //console.log(JSON.stringify(result)+"这是文章评论");
      //如果返回错误状态码并且返回结果为null
      if (result.statusCode || !result.length) {
        // if (result.statusCode) {
        //则没有评论
        that.comment_if=false;
      }else {
        that.comment_if=true;
        that.comments = result[0];
        // console.log(JSON.stringify(result[0])+"这是文章======评论");
      }
    });
  }

  //显示是否收藏
  showIfCollect(that){
    if(this.storage.get('user_id')) {
      that.articlesSer.showcollect(that.userid + '',
        that.artid + '').then((result)=> {
        //45表示已收藏
        if (result.statusCode == 45) {
          that.collect_if = true;
          that.className = "btn collect_btn active";
          that.collectName='已收藏'
        } else {
          that.collect_if = false;
          that.className = "btn collect_btn";
          that.collectName='收藏'
        }
      });
    }else{
      that.className = "btn collect_btn";
      that.collectName='收藏'
    }
  }

  //显示收藏数
  showCollectNum(that){
    that.articlesSer.showcollnum(that.artid + '').then(
      (result)=> {
      if (result.statusCode == 95) {
        that.collectNum=0+'';
      } else {
        that.collectNum=result[0].coll_num;
        // console.log(+"这是收藏的代号！！")
      }
    });
  }

  //封装未登录的操作
  // unlogin(that){
    // console.log("用户未登录！！！！！！！！！！");
    //让模态框显示在用户的该位置
    // that.scroll_top = window.scrollY*1.1+"px";
    // that.full_height=document.body.offsetHeight +"px";
    //弹出模态框
    // that.modal_if =true;
  // }

  // 关闭模态框
  // close(){
  //   this.modal_if = false;
  // }

  //去登录界面
  // toLogin(){
  //   this.router.navigate(['/login']);
  // }

  //评论该文章
  artcomment(){
    //如果用户已登录
    if(this.storage.get('user_id')){
      //从route获取文章id
      // this.artid = this.artid
      let that=this;
      //从sessionStorage中获取用户id
      that.userId=this.storage.get('user_id');
      //添加评论
      that.CommentsService.addArticleComments(that.articlecomment+'',that.artid+'',that.userId+'').then(
        (result)=> {
        //当评论成功后
        // console.log(result.statusCode+"============这是新插评论");
        if (result.statusCode==25) {
          //评论成功后将评论框中的内容清空
          that.articlecomment='';
          that.CommentsService.getArticleComments(that.artid+'').then( (result)=> {
            //console.log(result.length);
            if (result.statusCode || !result.length) {
              that.comment_if=false;
            }else {
              that.comment_if=true;
              that.comments = result[0];
            }
          });
        }else {
          console.log('失败');
        }
      });
    }else{
      let that=this;
      // this.unlogin(that);
    }
  }

  //改变收藏状态
  changeBg(){
    //如果用户已登录
    if(this.storage.get('user_id')) {
      let that = this;
      //点击收藏
      if (that.collectName == '收藏') {
        //console.log("这是未收藏显示");
        console.log(that.userId)
        console.log(that.artid)
        that.articlesSer.insertcoll(that.userId + '', that.artid + '').then(
          (result)=> {
            console.log(result)
          //收藏成功
          // console.log(result.statusCode+"这是状态码");
      //     if (result.statusCode == 48) {
      //       that.showCollectNum(that);
      //       that.className = "btn collect_btn active";
      //       that.collectName = '已收藏'
      //     }
      //   });
      // }else if(that.collectName == '已收藏'){
      //   //点击删除
      //   that.articlesSer.deletecoll(
      //     that.userId + '', this.artid + '').then(
      //       (result)=> {
      //     //取消收藏
      //     if (result.statusCode ==50) {
      //       that.showCollectNum(that);
      //       that.className = "btn collect_btn";
      //       that.collectName = '收藏'
      //     }
        });
      }
    }else{
      let that=this;
      // this.unlogin(that);
    }
  }

  //跳转到个人空间
  // togetuserid(userid){
    // console.log("000");
    // this.router.navigate(['/personaldetail',userid]);
  // }

  //点赞
  // articlecomlike(articlecom_id,comment){
  //
  //   // console.log(this)
  //   // console.log(articlecom_id)
  //   if(this.storage.get('user_id') && !this.like_if){
  //     // let articlecom_id=this.comment.articlecom_id;
  //     // console.log(this._comment.articlecom_id+"该评论的id==============");
  //     let that=this;
  //     that.CommentsService.articleComLike(articlecom_id+'').then(
  //       (result)=> {
  //       if (result.statusCode==35) {
  //         that.like_if = true;
  //         comment.like_num+=1;
  //         console.log(that)
  //         // this.color="this.like_if?'red':'#b4b4b4'"
  //       }else {
  //       }
  //     });
  //   }
  // }

}
