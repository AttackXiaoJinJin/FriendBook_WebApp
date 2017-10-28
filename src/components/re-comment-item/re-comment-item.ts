import {Component, Input, Output, EventEmitter} from '@angular/core';

/**
 * Generated class for the ReCommentItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 're-comment-item',
  templateUrl: 're-comment-item.html'
})
export class ReCommentItemComponent {

  @Input() _recomment: any;

  constructor() {

  }

}
