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
import {ArticleComponent} from "../pages/article/article"
//services
import {HttpClientModule} from '@angular/common/http';
import {HttpClient} from "@angular/common/http";
// import {HttpModule} from "@angular/http";

import {UsersService} from "../providers/users.service";
import {ArticlesService} from "../providers/articles.service"
import {CommentsService} from "../providers/comments.service"
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms"
//管道
import {PipesModule} from "../pipes/pipes.module"
import {IonicStorageModule} from "@ionic/storage";
import {ComponentsModule} from "../components/components.module";
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
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
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

  ]
})
export class AppModule {}
