import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RecommentsService} from "../../providers/recomments.service";
import {CommentsService} from "../../providers/comments.service";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'app-article-comment',
  templateUrl: './artcom.html',
  providers:[CommentsService,RecommentsService]
})
export class ArticleCommentComponent implements OnInit {

  @Input() _comment: any;
  @Output() login_if = new EventEmitter();
  like_num:any;
  like_if:boolean=false;
  //==============
  answer:any;
  if_show:boolean=false;
  if_recom: boolean;
  recomments:any;
  //登录的用户的id
  userid:any;
  //回复内容
  recontent:any;
  constructor(
    private comSer:CommentsService,
    private RecommentsService:RecommentsService,
    private storage:Storage
  ) { }

  ngOnInit() {
    this.storage.set("user_id",6)
    this.like_num=this._comment.like_num;
    this.answer="inner_comment hide";
    //获取回复
    this.recomment();
  }

  articlecomlike(){
    if(this.storage.get('user_id') && !this.like_if){
      var articlecom_id=this._comment.articlecom_id;
      // console.log(this._comment.articlecom_id+"该评论的id==============");
      let that=this;
      that.comSer.articleComLike(articlecom_id+'').then((result)=> {
        if (result.statusCode==35) {
          that.like_if = true;
          that.like_num+=1;

        }else {
        }
      });
    }
  }

  togetuserid(user_id){
    // this.router.navigate(['/personaldetail',user_id]);
  }

  //是否显示anser区域
  showAnswer(){
    //先判断是否登录
    if(this.storage.get('user_id')) {
      if (this.if_show) {
        this.answer = "inner_comment hide";
        this.if_show = false;
      } else {
        this.answer = "inner_comment";
        this.if_show = true;
      }
    }else{
      this.login_if.emit(true);
    }
  }
//==============取消按钮
  closeAnswer(){
    this.answer = "inner_comment hide";
    this.if_show = false;
  }
//======================获取回复
  recomment(){
    let that=this;
    that.RecommentsService.getartrecoms(
      // that._comment.articlecom_id+'').then( (result)=> {
      that._comment.articlecom_id+'',function(result) {
      //如果返回错误状态码并且返回结果为null
      if (result.statusCode || !result.length) {
        //则没有回复
        that.if_recom=false;
      }else {
        that.if_recom=true;
        that.recomments=result;
        // console.log(result)
      }
    });
  }
//======================添加回复
  addrecom() {
    let that = this;
    that.userid=this.storage.get('user_id');
    that.RecommentsService.addartrecoms(that.userid+'',that.recontent+'',that._comment.articlecom_id+'',function (result) {
      //插入成功
      if (result.statusCode == 121) {
        that.recontent='';
        // that.RecommentsService.getartrecoms( that._comment.articlecom_id+'').then( (result)=> {
        that.RecommentsService.getartrecoms( that._comment.articlecom_id+'',function(result) {
          if (result.statusCode || !result.length) {
            that.if_recom = false;
          } else {
            that.if_recom = true;
            that.recomments = result;
          }
        });
      } else {
        console.log('失败');
      }
    });
  }


}
