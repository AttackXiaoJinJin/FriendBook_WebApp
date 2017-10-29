import {Component, Input, Output, EventEmitter} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MySlidePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-slide',
  templateUrl: 'my-slide.html',
})
export class MySlidePage {
  @Input("slides") slides: string[] = [];
  @Input("pageNumber") pageNumber: number = 4;
  @Output("slideClick") slideClick = new EventEmitter<number>();

  // mySlideOptions;
  selectedIndex: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    // this.mySlideOptions = {
    //   loop: false,
    //   autoplay: false,
    //   initialSlide: 0,
    //   pager: false,
    //   slidesPerView: this.pageNumber,
    //   paginationHide: true,
    //   paginationClickable: true
    // };
  }

  onClick(index) {
    this.selectedIndex = index;
    this.slideClick.emit(index);
  }
}
