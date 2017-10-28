import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import {ComponentsModule} from "../../components/components.module";
import {BannerComponent} from "../../components/banner/banner";
import {ArticleComponent} from "../../components/article/article";

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    // BannerComponent,
    // ComponentsModule,ArticleComponent
  ],
})
export class HomePageModule {}
