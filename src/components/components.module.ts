import { NgModule } from '@angular/core';
import { TopicitemComponent } from './topicitem/topicitem';
import { ArticleCommentComponent } from './artcom/artcom';
import { ArtrecomComponent } from './artrecom/artrecom';
import {AddressShowComponent} from "./address-show/address-show.component";
@NgModule({
	declarations: [TopicitemComponent,ArticleCommentComponent,
    ArtrecomComponent,AddressShowComponent],
	imports: [],
	exports: [TopicitemComponent,ArticleCommentComponent,
    ArtrecomComponent,AddressShowComponent]
})
export class ComponentsModule {}
