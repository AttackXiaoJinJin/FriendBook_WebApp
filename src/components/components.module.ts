import { NgModule } from '@angular/core';
import { ArticleCommentComponent } from './artcom/artcom';
import { ArtrecomComponent } from './artrecom/artrecom';
import {AddressShowComponent} from "./address-show/address-show.component";
@NgModule({
	declarations: [ArticleCommentComponent,
    ArtrecomComponent,AddressShowComponent],
	imports: [],
	exports: [ArticleCommentComponent,
    ArtrecomComponent,AddressShowComponent]
})
export class ComponentsModule {}
