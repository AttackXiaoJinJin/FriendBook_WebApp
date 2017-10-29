import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { BooksService } from '../../providers/books.service';
import { BeautysService } from '../../providers/beauty.service';
import { Storage } from '@ionic/storage';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {CommentsService} from "../../providers/comments.service";
import {RecommentsService} from "../../providers/recomments.service";
declare var $:any;
/**
 * Generated class for the BookdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookdetail',
  templateUrl: 'bookdetail.html',
  providers: [ BooksService, BeautysService, CommentsService ]
})
export class BookdetailPage {
  user_id:any;
  book_id:any;
  _book:any;
  beauty_if:any;
  _beautys:any;
  _comments:any;
  love_if:boolean = false;
  focus_input:boolean = false;
  _bookcomment:any;
  commentForm: FormGroup;
  _com_centent:any;
  recomment_input:any = false;
  _bookcom_id:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public BooksService:BooksService,
    public BeautysService:BeautysService,
    public CommentsService:CommentsService,
    public RecommentsService:RecommentsService,
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
    this.book_id=this.navParams.get('book_id');
    let str = '{"book_id":'+ this.book_id +'}';
    let bookid = JSON.parse(str);
    this.BooksService.getBookdetailById(bookid,result=>{
      if (result.statusCode) {
      }else {
        this._book = result[0];
      }
    });
    this.BeautysService.getAllBeautys(bookid,result=> {
      if (result.statusCode) {
        this.beauty_if = false;
      }else {
        this.beauty_if = true;
        this._beautys = result[0];
      }
    });
    this.getcomment(bookid);
    this.storage.ready().then(() => {
      this.storage.get('user_id').then((val) => {
        this.user_id = val;
        this.showlove(val);
      })
    });
  }

  //返回
  back(){
    this.viewCtrl.dismiss();
  }



  //判断是否喜欢过
  showlove(userid){
    let str2 = '{"book_id":'+ this.book_id +',"user_id":'+userid+'}';
    let booklove = JSON.parse(str2);
    this.BooksService.showlove(booklove,result=> {
      if (result.statusCode==38) {
        this.love_if=true;
      }else {
        this.love_if=false;
      }
    });
  }


  //喜欢书
  lovebook(){
    let str = '{"book_id":'+ this.book_id +',"user_id":'+this.user_id+'}';
    let booklove = JSON.parse(str);
    //喜欢书
    if(!this.love_if){
      this.BooksService.insertlove(booklove,result=> {
        if (result.statusCode==41) {
          this.love_if=true;
        }else {
          this.alert_tip();
        }
      });
    }else{//取消喜欢
      this.BooksService.deletelove(booklove,result=>{
        if (result.statusCode==43) {
          this.love_if=false;
        }else {
          this.alert_tip();
        }
      });
    }
  }

  focusComment(e){
    e.style.width='290px';
    this.focus_input = true;
  }
  blurComment(e){
    if(this.focus_input){
      if(e.target.nodeName.toLocaleLowerCase()=="a"&&e.target.innerHTML=="回复"){

      }else{
        $('#comment_input').css('width','260px');
        this.focus_input = false;
        if(this.recomment_input){
          this._bookcomment = '';
          this.recomment_input = false;
        }
      }
    }
  }
  getcomment(book){
    this.CommentsService.getBookComments(book,result=> {
      if (result.statusCode || !result[0].length) {
      } else {
        this._comments = result[0];
      }
    });
  }
  comment(){
    if(this._bookcomment){
      let str = '{"book_id":'+ this.book_id +',"user_id":'+this.user_id+',"bookcom_content":"'+this._bookcomment+'"}';
      let bookcomment = JSON.parse(str);
      if(this.recomment_input){
        // console.log(this._bookcom_id);
        //添加回复的事件..........
        this.RecommentsService.addbkrecoms(this.user_id+'',this._bookcomment+'',this._bookcom_id+'',result=>{
          //插入成功
          if (result.statusCode == 118) {
            this._bookcomment='';
            $('#comment_input').css('width','260px');
            this.focus_input = false;
            this.recomment_input = false;
            this.getcomment(bookcomment);
          } else {
            this.alert_tip();
          }
        });
      }else{
        this.CommentsService.addBookComments(bookcomment,result=> {
          if (result.statusCode == 22) {
            this._bookcomment = '';
            $('#comment_input').css('width','260px');
            this.focus_input = false;
            this.getcomment(bookcomment);
          }else{
            this.alert_tip();
          }
        });
      }
    }
  }
  ReComment(bookcom_id){
    this._bookcom_id = bookcom_id;
    this.recomment_input = true;
    $('#comment_input')[0].focus();
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
