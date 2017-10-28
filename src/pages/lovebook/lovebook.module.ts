import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LovebookPage } from './lovebook';

@NgModule({
  declarations: [
    LovebookPage,
  ],
  imports: [
    IonicPageModule.forChild(LovebookPage),
  ],
})
export class LovebookPageModule {}
