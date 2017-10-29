import { Component } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';
import {MySlidePage} from "../my-slide/my-slide";
import { BooksService } from '../../providers/books.service';
import {BookdetailPage} from "../bookdetail/bookdetail";
import {TopicdetailPage} from "../topicdetail/topicdetail"
@Component({
  selector: 'page-books',
  templateUrl: 'books.html',
  providers: [ BooksService ]
})
export class BooksPage {
  pageIndex: number = 0;
  pageContent: string;
  pageSlides: string[] = ["全&nbsp;&nbsp;&nbsp;部", "科幻小说", "青春文学", "外国文学", "文学艺术", "人文社科", "品质生活", "职场进修"];

  _books: any;
  user_id:any;
  constructor(
    public navCtrl: NavController,
    public modalCtrl:ModalController,
    public BooksService:BooksService,
  ) {
  }

  //页面加载时
  ionViewDidLoad(){
    this.setPageContent();
    this.BooksService.getAllBooks(result => {
      if(result.statusCode){
        console.log(result.statusCode);
      }else{
        this._books = result;
      }
    });
  }
  onSlideClick(index) {
    this.pageIndex = index;
    this.setPageContent();
  }

  setPageContent() {
    this.pageContent = this.pageSlides[this.pageIndex];
  }

  toBookDetail(book_id){
    const modelPage=this.modalCtrl.create(BookdetailPage,{"book_id":book_id});
    modelPage.present();
  }

}
