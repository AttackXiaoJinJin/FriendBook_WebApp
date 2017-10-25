import {Component, ViewChild} from '@angular/core';
import {IonicPage, ModalController, NavController, Slides} from 'ionic-angular';
import {TopicsServerProvider} from "../../providers/topics-server";
import {BooksService} from "../../providers/books.service";
import {ArticlesService} from "../../providers/articles.service";
 import {RegistPage} from "../regist/regist";
import {MycollectPage} from "../mycollect/mycollect";
import {MyarticlePage} from "../myarticle/myarticle";
import {MyorderPage} from "../myorder/myorder";
import {ReplyPage} from "../reply/reply";

declare var $:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) mySlides: Slides;
  imgs = ['banner1.jpg','banner2.jpg','banner3.jpg'];
  //===========话题
  m:number=0
  n:number=2
  start:number=0
  topics:any
  //=====书
  bm:number=0
  bn:number=3
  bstart:number=0
  books:any=[]
  // books:any
  //文章
  acm:number=0
  acn:number=3
  acstart:number=0
  // comarts:any=[]
  comarts:any
  // colarts:any=[]
  colarts:any
  //还能加载话题
  if_topic:boolean=true
  //还能加载话题
  if_book:boolean=true
  //是否关注
  attent_if:boolean=false
  allitems:any=[]

  constructor(
    public navCtrl: NavController,
    private tp: TopicsServerProvider,
    private bp:BooksService,
    private ap:ArticlesService,
    public modalCtrl:ModalController,
    ) {

  }

  //页面一加载
  ionViewDidLoad(){

    //加载两个话题
    this.m=0
    this.twotopics()
    //加载三本书
    this.bm=0
    this.threebooks()
  //  三篇热门文章
    this.acm=0
    this.threecomart()
    // this.allitems=this.topics+this.books+this.colarts+this.comarts
    // this.allitems.push([this.books,this.colarts,this.topics,this.comarts])

  }

  //获取搜索框中的内容
  getItems(ev: any) {
    let val = ev.target.value;
    //搜索
  }
  // 点击轮播图后
  slideChanged() {
    this.mySlides.startAutoplay();
  }

  //加载两个话题
  twotopics(){
    let that=this
    this.tp.twotopics(this.start+'',this.n+'').then((result)=> {
      if(result.statusCode==76){
        that.if_topic=false
      }else{
        that.if_topic=true
        that.topics=result
        console.log(that.topics)
        console.log(that.topics[0])
      }
    });

    this.start=(this.m)*(this.n)
    this.m+=1

  }
  //加载3本书
  threebooks(){
    let that=this
    this.bp.threebooks(this.bstart+'',this.bn+'').then((result)=> {
      if(result.statusCode==130){
        that.if_book=false
      }else{
        that.if_book=true
        // that.books.push(result)
        that.books=result
        // console.log(that.books)
      }
    });

    this.bstart=(this.bm)*(this.bn)
    this.bm+=1
  }

  //加载三个文章,3篇推荐文章
  threecomart(){
    let that=this
    this.ap.threecomart(this.acstart+'',this.acn+'').then((result)=> {
      if(result.statusCode==131){
        that.if_book=false
      }else{
        that.if_book=true
        that.comarts=result
      }
    });
    this.ap.threecolart(this.acstart+'',this.acn+'').then((result)=> {
      if(result.statusCode==131){
        that.if_book=false
      }else{
        that.if_book=true
        that.colarts=result
      }
    });

    this.acstart=(this.acm)*(this.acn)
    this.acm+=1
  }

  //===========下拉刷新
  doRefresh(refresher) {
    setTimeout(() => {
      //加载两个话题
      this.m=0
      this.twotopics()
      //加载三本书
      this.bm=0
      this.threebooks()
      //  三篇热门文章
      this.acm=0
      this.threecomart()

      refresher.complete();
    }, 2000);
  }

  //上拉加载
  doInfinite(infiniteScroll) {
    return new Promise((resolve) => {
      setTimeout(() => {

        this.twotopics()

        // //加载三本书
        this.threebooks()
        console.log(this.books)

        // //  三篇热门文章
        this.threecomart()
        // var li = document.createElement('li');
        // li.innerHTML =
        //
        //
        // document.querySelector('#allitems').appendChild(li);

        resolve();
      }, 2000);
    })
  }

  //注册
  toRegist(){
    let modelPage=this.modalCtrl.create(RegistPage);
    modelPage.present();
  }
  //我的收藏
  toMyCollect(){
    let modelPage=this.modalCtrl.create(MycollectPage);
    modelPage.present();
  }
  //我发表的
  toMyPublish(){
    let modelPage=this.modalCtrl.create(MyarticlePage);
    modelPage.present();
  }
  //我的订单
  toMyOrder(){
    let modelPage=this.modalCtrl.create(MyorderPage);
    modelPage.present();
  }
  //@我的
  toReply(){
    let modelPage=this.modalCtrl.create(ReplyPage);
    modelPage.present();
  }




}
