import { Component,Input } from '@angular/core';
import {UsersService} from "../../providers/users.service"
@Component({
  selector: 'pagearticle',
  templateUrl: 'pagearticle.html',
  providers:[UsersService]

})
export class ArticleComponent {
  @Input() _article: any;
  text: string;

  constructor(
    private userSer:UsersService,

  ) {
    console.log('Hello ArticleComponent Component');
    this.text = 'Hello World';
  }



}
