import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MySlidePage } from './my-slide';

@NgModule({
  declarations: [
    MySlidePage,
  ],
  imports: [
    IonicPageModule.forChild(MySlidePage),
  ],
})
export class MySlidePageModule {}
