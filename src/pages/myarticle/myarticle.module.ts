import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyarticlePage } from './myarticle';

@NgModule({
  declarations: [
    MyarticlePage,
  ],
  imports: [
    IonicPageModule.forChild(MyarticlePage),
  ],
})
export class MyarticlePageModule {}
