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
import {ComponentsModule} from "../components/components.module";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {TopicsServerProvider} from "../providers/topics-server";
import {BooksService} from "../providers/books.service";
import {ArticlesService} from "../providers/articles.service";
import {PipesModule} from "../pipes/pipes.module";
import {RegistPage} from "../pages/regist/regist";
import {UsersService} from "../providers/users.service";
import { IonicStorageModule } from '@ionic/storage';
import {NotfindPage} from "../pages/notfind/notfind";
import {MycollectPage} from "../pages/mycollect/mycollect";
import {MyarticlePage} from "../pages/myarticle/myarticle";
import {OrdersService} from "../providers/orders.service";
import {MyorderPage} from "../pages/myorder/myorder";
import {ReplyPage} from "../pages/reply/reply";
import {SearchPage} from "../pages/search/search";


@NgModule({
  declarations: [
    MyApp,
    BooksPage,
    PublishPage,
    HomePage,
    TopicsPage,
    PersonCenterPage,
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
    FormsModule,
    HttpModule,
    PipesModule

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
    TopicsServerProvider,
    BooksService,
    ArticlesService,
    UsersService,
    OrdersService,

  ]
})
export class AppModule {}
