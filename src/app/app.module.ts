import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HttpModule} from "@angular/http";
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//page
import { BooksPage } from '../pages/books/books';
import { PublishPage } from '../pages/publish/publish';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {ArticledetailPage} from "../pages/articledetail/articledetail";
import {PayPage} from "../pages/pay/pay";
import {AddaddressPage} from "../pages/addaddress/addaddress";
import {PaysuccessPage} from "../pages/paysuccess/paysuccess";
import {LineitemPage} from "../pages/lineitem/lineitem";
import {ReturnmoneyPage} from "../pages/returnmoney/returnmoney";
import {ReturnsuccessPage} from "../pages/returnsuccess/returnsuccess"
import {TopicsPage} from "../pages/topics/topics";
import {PersonCenterPage} from "../pages/person-center/person-center";
import {MySlidePage} from "../pages/my-slide/my-slide";
import {BookdetailPage} from "../pages/bookdetail/bookdetail";
import {LoginPage} from "../pages/login/login";
import {SettingPage} from "../pages/setting/setting";
import {AddressPage} from "../pages/address/address";
import {LovebookPage} from "../pages/lovebook/lovebook";
import {AttentopicPage} from "../pages/attentopic/attentopic";
import {AddressAddPage} from "../pages/address-add/address-add";
import {AddressAddcityPage} from "../pages/address-addcity/address-addcity";
import {RegistPage} from "../pages/regist/regist";
import {NotfindPage} from "../pages/notfind/notfind";
import {MycollectPage} from "../pages/mycollect/mycollect";
import {MyarticlePage} from "../pages/myarticle/myarticle";
import {MyorderPage} from "../pages/myorder/myorder";
import {ReplyPage} from "../pages/reply/reply";
import {SearchPage} from "../pages/search/search";
import {TopicdetailPage} from "../pages/topicdetail/topicdetail";
import {PersondetailPage} from "../pages/persondetail/persondetail"

//component
import {CommentItemComponent} from "../components/comment-item/comment-item";
import {ReCommentItemComponent} from "../components/re-comment-item/re-comment-item";
import {TopicitemComponent} from "../components/topicitem/topicitem";
import {ArticleComponent} from "../components/article/article";
import {ArticleCommentComponent} from "../components/artcom/artcom";
import {ArtrecomComponent} from "../components/artrecom/artrecom";
import {AddressShowComponent} from "../components/address-show/address-show.component";

//services
import {HttpClientModule} from '@angular/common/http';
import {TopicsServerProvider} from "../providers/topics-server";
import {ArticlesService} from "../providers/articles.service";
import {OrdersService} from "../providers/orders.service";
import { BooksService } from '../services/books.service';
import { BeautysService } from '../services/beauty.service';
import { CommentsService } from '../services/comments.service';
import { RecommentsService } from '../services/recomments.service';
import { UsersService } from '../services/users.service';
import { ReceiveService } from '../services/receive.service';
import { TopicService } from '../services/topic.service';
import {GlobalPropertyService} from "../providers/global-property.service";



//管道
import { FindbookPipe } from '../pipes/findbook.pipe';
import { StringSlicePipe} from "../pipes/string-slice.pipe";


@NgModule({
  declarations: [
    MyApp,
    AddressPage,
    AttentopicPage,
    AddressAddPage,
    AddressAddcityPage,
    BooksPage,
    BookdetailPage,
    HomePage,
    LoginPage,
    LovebookPage,
    MySlidePage,
    PublishPage,
    PersonCenterPage,
    PersondetailPage,
    SettingPage,
    TopicsPage,
    TabsPage,
    TopicdetailPage,
    ArticledetailPage,
    PayPage,
    AddaddressPage,
    PaysuccessPage,
    LineitemPage,
    ReturnmoneyPage,
    ReturnsuccessPage,
    RegistPage,
    NotfindPage,
    MycollectPage,
    MyarticlePage,
    MyorderPage,
    ReplyPage,
    SearchPage,
    FindbookPipe,
    StringSlicePipe,
    CommentItemComponent,
    ReCommentItemComponent,
    ArticleComponent,
    ArticleCommentComponent,
    ArtrecomComponent,
    AddressShowComponent,
    TopicitemComponent,
    ArticleComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    FormsModule,
    HttpModule,

    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BooksPage,
    PublishPage,
    HomePage,
    TopicsPage,
    PersonCenterPage,
    TabsPage,
    TopicdetailPage,
    PersondetailPage,
    ArticledetailPage,
    PayPage,
    AddaddressPage,
    PaysuccessPage,
    LineitemPage,
    ReturnmoneyPage,
    ReturnsuccessPage,
    ArticleComponent,
    // ArticleCommentComponent,
    // ArtrecomComponent,
    RegistPage,
    NotfindPage,
    MycollectPage,
    MyarticlePage,
    MyorderPage,
    ReplyPage,
    SearchPage,
    MySlidePage,
    BookdetailPage,
    LoginPage,
    SettingPage,
    AddressPage,
    LovebookPage,
    AttentopicPage,
    AddressAddPage,
    AddressAddcityPage,
    CommentItemComponent,
    ReCommentItemComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersService,
    ArticlesService,
    CommentsService,
    RecommentsService,
    ReceiveService,
    GlobalPropertyService,
    TopicsServerProvider,
    BooksService,
    OrdersService,
    BeautysService,
    TopicService
  ]
})
export class AppModule {}
