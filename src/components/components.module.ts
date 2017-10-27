import { NgModule } from '@angular/core';
import { TopicitemComponent } from './topicitem/topicitem';
import { ArticleComponent } from './article/article';
@NgModule({
	declarations: [TopicitemComponent,
    ArticleComponent],
	imports: [],
	exports: [TopicitemComponent,
    ArticleComponent]
})
export class ComponentsModule {}
