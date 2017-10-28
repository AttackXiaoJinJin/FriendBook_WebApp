import {Component, Input, Output, EventEmitter} from '@angular/core';
import { RecommentsService } from '../../services/recomments.service';
import { CommentsService } from '../../services/comments.service';
/**
 * Generated class for the CommentItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'comment-item',
  templateUrl: 'comment-item.html',
  providers: [ RecommentsService ]
})
export class CommentItemComponent {

  @Input() _comment: any;
  like_num:any;
  like_if:any;
  _recomments:any;
  @Output("recomment") recomment = new EventEmitter<number>();
  constructor(
    public RecommentsService:RecommentsService,
    public CommentsService:CommentsService,
  ) {

  }
  ngOnInit() {
    this.like_num = this._comment.like_num;

    this.RecommentsService.getbkrecoms(this._comment.bookcom_id+'',result=> {
      //如果返回错误状态码并且返回结果为null
      if (result.statusCode || !result.length) {
      }else {
        this._recomments=result;
      }
    });
  }

  bookcomlike(){
    if(!this.like_if){
      let str = '{"bookcom_id":'+ this._comment.bookcom_id +'}';
      let bookcom_id = JSON.parse(str);
      this.CommentsService.bookComLike(bookcom_id,result=> {
        // console.log(result);
        if (result.statusCode==32) {
          this.like_if = true;
          this.like_num+=1;
        }
      });
    }
  }

  reComment(bookcom_id){
    this.recomment.emit(bookcom_id);
  }
}
