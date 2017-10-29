import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//服务
import {BooksService} from "../../providers/books.service";
import {ArticlesService} from "../../providers/articles.service";
import {TopicsServerProvider} from "../../providers/topics-server";


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  search:string="books";
  _books: any;
  article;any;
  _articles: any;
  searchText: any;
  _article: any;
  _topics: any;
  aaa:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private BooksService:BooksService,
    private ArticlesService: ArticlesService,
    private TopicService:TopicsServerProvider) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SearchPage');
    this.searchText = this.navParams.get('searchCon');

    console.log(this.searchText);

    //把searchCon转换为json数组       搜索内容
    let str = '{"searchCon":"' + this.searchText + '"}';
    let searchCon = JSON.parse(str);


    let that = this;
    that.BooksService.searchBook(searchCon, function (result) {
      console.log(result);
      if (!result.statusCode) {
        that._books = result[0];
      }
      // console.log(that._topics);
    });

  //  -------------------------------文章--------------------------------
    that.ArticlesService.searchArticle(searchCon, function (result) {
      // console.log(result);
      if (!result.statusCode) {
        that._articles = result[0];
        // console.log(that._articles);
      }

    });

  //  ------------------------话题-------------------
    that.TopicService.searchTopic(searchCon, function (result) {
      if (!result.statusCode) {
        that._topics = result[0];
      }
      // console.log(that._topics);
    });
  }


  back(){
    this.navCtrl.pop();
    // this.navCtrl.push(TabsPage);
    // this.viewCtrl.dismiss({"newName":"lzhan"});

  }

}
