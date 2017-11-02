import {Component, ElementRef, Renderer, ViewChild} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {ArticlesService} from "../../providers/articles.service";
import {TopicsServerProvider} from "../../providers/topics-server";
import {GlobalPropertyService} from "../../providers/global-property.service";
// import * as wangEditor from '../../../src/wangEditor.js'
import {ChoosePage} from "../choose/choose";
import {LoginPage} from "../login/login";
import {Storage} from "@ionic/storage";


declare var $:any;
@Component({
  selector: 'page-publish',
  templateUrl: 'publish.html',
  providers:[ArticlesService,TopicsServerProvider]
})
export class PublishPage {
  private editor:any;
  article_title:any;
  article:any;
  articleContent:any
  userid:any;
  tishi:any="下一页";
  formData: FormData;
 // @ViewChild(PublishComponent) editor: PublishComponent;
  constructor(
    public navCtrl: NavController,
    private  glo:GlobalPropertyService,
    private artSer:ArticlesService,
    private topSer:TopicsServerProvider,
    private el: ElementRef,
    private renderer: Renderer,
    public modalCtrl: ModalController,
    private storage:Storage


  ) {

  }

  ionViewDidLoad() {
    // let editordom = this.el.nativeElement.querySelector('#editorElem');
    // this.editor = new wangEditor(editordom);
    // this.editor = ;
    //this.editor.customConfig.uploadImgShowBase64 = true;
    // this.editor.create()

  // if(!storage.getItem('user_id')){
  // this.router.navigate(['/login']);
  // }

  // let that=this;
  // that.userid=6;
  // this.formData = new FormData();
}

  ionViewWillEnter() {
    let that=this
    this.storage.ready().then(() => {
      this.storage.get('user_id').then((val) => {
        if(val){
          that.userid=val
        }else{
          this.navCtrl.push(LoginPage)
        }
      })
    });
  }

  clickHandle():any {
    let data = this.editor.txt.html();
    return data
  }




  //富文本框的函数
  PostData(event):void {
    console.log(event)
  }

  //跳到下一个页面
  toChoose() {
    // this.articleContent = this.editor.clickHandle();

    if (!this.article_title) {
      this.tishi = "请输入文章标题！";
      return false;
    }
    // else if (this.articleContent=='<p><br></p>') {
    // else if (this.articleContent=='undefined' || this.articleContent=='') {
    else if (!Boolean($('#editorElem').val())) {
      this.tishi = "请输入文章内容！";
      console.log(Boolean($("#editorElem").val())+"这是内容")
      return false;
    } else {
      this.articleContent=$("#editorElem").val()
      this.tishi = "下一步";

      let that = this;
      let modelPage = this.modalCtrl.create(ChoosePage, {
        "article_title": that.article_title,
        "article_content": that.articleContent
      });
      // modelPage.onDidDismiss(data => {
      // });
      modelPage.present();
      return true
    }

  }



}
