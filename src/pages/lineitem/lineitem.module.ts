import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LineitemPage } from './lineitem';

@NgModule({
  declarations: [
    LineitemPage,
  ],
  imports: [
    IonicPageModule.forChild(LineitemPage),
  ],
})
export class LineitemPageModule {}
