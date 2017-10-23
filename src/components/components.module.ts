import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { BannerComponent } from './banner/banner';
import {BooksPage} from "../pages/books/books";
import {NgFor} from "@angular/common";
import { ArticleComponent } from './article/article';
@NgModule({
	declarations: [BannerComponent,
    ArticleComponent],
	imports: [],
	exports: [BannerComponent,
    ArticleComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],

})
export class ComponentsModule {}
