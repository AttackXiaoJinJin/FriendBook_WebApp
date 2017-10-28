import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersondetailPage } from './persondetail';

@NgModule({
  declarations: [
    PersondetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PersondetailPage),
  ],
})
export class PersondetailPageModule {}
