import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RecommentsService} from "../../providers/recomments.service";
import {CommentsService} from "../../providers/comments.service";
import {Storage} from "@ionic/storage";
import {LoginPage} from "../../pages/login/login";
import {ModalController} from "ionic-angular";

@Component({
  selector: 'app-article-comment',
  templateUrl: './artcom.html',
  providers:[CommentsService,RecommentsService]
})
export class ArticleCommentComponent {

  @Input() _comment: any;
  @Output("reartcomment") reartcomment = new EventEmitter<number>();
  like_num:any;
  like_if:boolean=false;
  //==============
  answer:any;
  if_show:boolean=false;
  if_recom: boolean;
  islogin:any=false
  recomments:any;
  //登录的用户的id
  userid:any;
  //回复内容
  recontent:any;
  constructor(
    private comSer:CommentsService,
    private RecommentsService:RecommentsService,
    private storage:Storage,
    public modalCtrl:ModalController,

  ) { }

  ngOnInit()  {
    this.storage.ready().then(() => {
      this.storage.get('user_id').then((val) => {
        console.log(val)
        if(val){
          this.userid = val;
          this.islogin=true
        }else{
          this.islogin=false
        }

      })
    });
    console.log(this.islogin+"这是评论是否登录")
    this.like_num=this._comment.like_num;
    this.answer="inner_comment hide";
    //获取回复
    this.getrecomment();
  }

  articlecomlike(){
    if(this.islogin){
    if(!this.like_if){
      var articlecom_id=this._comment.articlecom_id;
      // console.log(this._comment.articlecom_id+"该评论的id==============");
      let that=this;
      that.comSer.articleComLike(articlecom_id+'',(result)=> {
        if (result.statusCode==35) {
          that.like_if = true;
          that.like_num+=1;
        }else {
        }
      });
    }
  }else{
      //=====跳到登录页面
      const modelPage=this.modalCtrl.create(LoginPage);
      modelPage.present();
    }
}
  reArtComment(bookcom_id){
    this.reartcomment.emit(bookcom_id);
  }
//======================获取回复
  getrecomment(){
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
      }
    });
  }
}
