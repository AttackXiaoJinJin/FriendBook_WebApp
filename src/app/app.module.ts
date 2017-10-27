import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { BooksPage } from '../pages/books/books';
import { PublishPage } from '../pages/publish/publish';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TopicsPage} from "../pages/topics/topics";
import {PersonCenterPage} from "../pages/person-center/person-center";

//hyc
import {TopicdetailPage} from "../pages/topicdetail/topicdetail";
import {TopicitemComponent} from "../components/topicitem/topicitem";
import {ArticleComponent} from "../components/article/article";
import {PersondetailPage} from "../pages/persondetail/persondetail"
//管道
import {StringSlicePipe} from "./../pipes/string-slice/string-slice"
//server
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from "@angular/http";
import { TopicsServerProvider } from '../providers/topics-server';
import {ArticlesService} from "../providers/articles.service"
import {UsersService} from "../providers/users.service";
import { IonicStorageModule } from '@ionic/storage';

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
    StringSlicePipe

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    HttpModule
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
    PersondetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TopicsServerProvider,
    ArticlesService,
    UsersService
  ]
})
export class AppModule {}
