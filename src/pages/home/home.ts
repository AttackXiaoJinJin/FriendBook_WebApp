import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, Slides} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) mySlides: Slides;

  imgs = ['banner1.jpg','banner2.jpg','banner3.jpg'];

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){

  }

  //获取搜索框中的内容
  getItems(ev: any) {
    let val = ev.target.value;
    //搜索
  }
  // 点击轮播图后
  slideChanged() {
    this.mySlides.startAutoplay();
  }

}
