import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressAddPage } from './address-add';

@NgModule({
  declarations: [
    AddressAddPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressAddPage),
  ],
})
export class AddressAddPageModule {}
