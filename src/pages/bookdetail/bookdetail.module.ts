import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookdetailPage } from './bookdetail';

@NgModule({
  declarations: [
    BookdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BookdetailPage),
  ],
})
export class BookdetailPageModule {}
