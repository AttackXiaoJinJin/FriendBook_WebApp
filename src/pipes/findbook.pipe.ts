import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'findbook'
})
export class FindbookPipe implements PipeTransform {
  constructor(
  ) { }

  transform(books: any, args?: any): any {
    if (books) {
      if (args && args.indexOf('&')== -1) {
        var new_books = books.filter(function (book, index) {
          args = args.slice(0,2);
          if (book.book_tag.indexOf(args) != -1) {
            return book;
          }
        });
        return new_books;
      } else {//不存在时
        return books;
      }
    }
  }
}
