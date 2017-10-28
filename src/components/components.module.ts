import { NgModule } from '@angular/core';
import { CommentItemComponent } from './comment-item/comment-item';
import { ReCommentItemComponent } from './re-comment-item/re-comment-item';
@NgModule({
	declarations: [CommentItemComponent,
    ReCommentItemComponent],
	imports: [],
	exports: [CommentItemComponent,
    ReCommentItemComponent]
})
export class ComponentsModule {}
