import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
import {MySlidePage} from "../pages/my-slide/my-slide";
import {BookdetailPage} from "../pages/bookdetail/bookdetail";
import {LoginPage} from "../pages/login/login";
import {SettingPage} from "../pages/setting/setting";
import {AddressPage} from "../pages/address/address";
import {LovebookPage} from "../pages/lovebook/lovebook";
import {AttentopicPage} from "../pages/attentopic/attentopic";
import {AddressAddPage} from "../pages/address-add/address-add";
import {AddressAddcityPage} from "../pages/address-addcity/address-addcity";
import {CommentItemComponent} from "../components/comment-item/comment-item";
import {ReCommentItemComponent} from "../components/re-comment-item/re-comment-item";

import {HttpClientModule} from '@angular/common/http';
import { BooksService } from '../services/books.service';
import { BeautysService } from '../services/beauty.service';
import { CommentsService } from '../services/comments.service';
import { RecommentsService } from '../services/recomments.service';
import { UsersService } from '../services/users.service';
import { ReceiveService } from '../services/receive.service';
import { TopicService } from '../services/topic.service';

import { FindbookPipe } from '../pipes/findbook.pipe';
import { StringSlicePipe} from "../pipes/string-slice.pipe";

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
    MySlidePage,
    FindbookPipe,
    StringSlicePipe,
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
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    FormsModule
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
    BooksService,
    BeautysService,
    CommentsService,
    RecommentsService,
    UsersService,
    ReceiveService,
    TopicService
  ]
})
export class AppModule {}
