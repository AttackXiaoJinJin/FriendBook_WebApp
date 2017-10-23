import { Component } from '@angular/core';

@Component({
  selector: 'article',
  templateUrl: 'article.html'
})
export class ArticleComponent {

  text: string;

  constructor() {
    console.log('Hello ArticleComponent Component');
    this.text = 'Hello World';
  }

}
