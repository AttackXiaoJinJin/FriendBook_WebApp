import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { BooksPage } from '../pages/books/books';
import { PublishPage } from '../pages/publish/publish';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {ArticledetailPage} from "../pages/articledetail/articledetail";
import{PayPage} from "../pages/pay/pay";
import {AddaddressPage} from "../pages/addaddress/addaddress";
import {PaysuccessPage} from "../pages/paysuccess/paysuccess";
import {LineitemPage} from "../pages/lineitem/lineitem";
import {ReturnmoneyPage} from "../pages/returnmoney/returnmoney";
import {ReturnsuccessPage} from "../pages/returnsuccess/returnsuccess"

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TopicsPage} from "../pages/topics/topics";
import {PersonCenterPage} from "../pages/person-center/person-center";
//services
import {HttpClientModule} from '@angular/common/http';
import {HttpClient} from "@angular/common/http";
// import {HttpModule} from "@angular/http";
import {ComponentsModule} from "../components/components.module";
import {PipesModule} from "../pipes/pipes.module";
import {RegistPage} from "../pages/regist/regist";
import {NotfindPage} from "../pages/notfind/notfind";
import {MycollectPage} from "../pages/mycollect/mycollect";
import {MyarticlePage} from "../pages/myarticle/myarticle";
import {OrdersService} from "../providers/orders.service";
import {MyorderPage} from "../pages/myorder/myorder";
import {ReplyPage} from "../pages/reply/reply";
import {SearchPage} from "../pages/search/search";

//hyc
import {TopicdetailPage} from "../pages/topicdetail/topicdetail";
import {TopicitemComponent} from "../components/topicitem/topicitem";
import {ArticleComponent} from "../components/article/article";
import {PersondetailPage} from "../pages/persondetail/persondetail"
//管道
import {StringSlicePipe} from "./../pipes/string-slice/string-slice"
//server
import {HttpModule} from "@angular/http";
import { TopicsServerProvider } from '../providers/topics-server';
import {ArticlesService} from "../providers/articles.service"
import {UsersService} from "../providers/users.service";
import { IonicStorageModule } from '@ionic/storage';


import {CommentsService} from "../providers/comments.service"
import {FormsModule} from "@angular/forms"
//管道
import {RecommentsService} from "../providers/recomments.service";
import {ArticleCommentComponent} from "../components/artcom/artcom";
import {ArtrecomComponent} from "../components/artrecom/artrecom";
import {BooksService} from "../providers/books.service";
import {ReceiveService} from "../providers/receive.service";
import {GlobalPropertyService} from "../providers/global-property.service";
import {AddressShowComponent} from "../components/address-show/address-show.component";
@NgModule({
  declarations: [
    MyApp,
    BooksPage,
    PublishPage,
    HomePage,
    TopicsPage,
    PersonCenterPage,
    TabsPage,
    TopicdetailPage,
    TopicitemComponent,
    ArticleComponent,
    PersondetailPage,
    StringSlicePipe,

    TabsPage,
    ArticledetailPage,
    PayPage,
    AddaddressPage,
    PaysuccessPage,
    LineitemPage,
    ReturnmoneyPage,
    ReturnsuccessPage,
    ArticleComponent,
    ArticleCommentComponent,
    ArtrecomComponent,
    AddressShowComponent,
    TabsPage,
    RegistPage,
    NotfindPage,
    MycollectPage,
    MyarticlePage,
    MyorderPage,
    ReplyPage,
    SearchPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    FormsModule,
    HttpModule,
    PipesModule,
    IonicStorageModule.forRoot(),
    PipesModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    // ComponentsModule,
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
    TabsPage,
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
    TabsPage,
    RegistPage,
    NotfindPage,
    MycollectPage,
    MyarticlePage,
    MyorderPage,
    ReplyPage,
    SearchPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersService,
    ArticlesService,
    CommentsService,
    RecommentsService,
    BooksService,
    ReceiveService,
    GlobalPropertyService,
    TopicsServerProvider,
    BooksService,
    OrdersService,
  ]
})
export class AppModule {}
