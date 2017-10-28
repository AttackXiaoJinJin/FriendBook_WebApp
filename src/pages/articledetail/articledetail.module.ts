import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticledetailPage } from './articledetail';

@NgModule({
  declarations: [
    ArticledetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticledetailPage),
  ],
})
export class ArticledetailPageModule {}
