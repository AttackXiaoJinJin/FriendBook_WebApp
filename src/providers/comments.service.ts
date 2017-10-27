import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class CommentsService {
  url:string='http://101.132.127.138:3000/comments';
  constructor(
    private http:HttpClient
  ) { }

  //================获取书籍评论
  getBookComments(book_id,callback){
    this.http.post(this.url+'/showbookcoms',book_id).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

  //=================评论书籍
  addBookComments(bookcomment,callback){
    this.http.post(this.url+'/bookcoms',bookcomment).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

  //================给书评论点赞
  bookComLike(bookcomment):Promise<any>{
    return this.http.post(this.url+'/bookcomlike',bookcomment).toPromise().then(
      function (result) {
        return(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

  //===============显示文章评论
  getArticleComments(article_id):Promise<any>{
    return this.http.post(this.url+'/showarticlecoms',
      {article_id: article_id}).toPromise().then(
      function (result) {
        // console.log(JSON.stringify(result)+"这是文章评论")
        return(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

  //=================评论文章
  addArticleComments(art_content,art_id,user_id):Promise<any>{
    return this.http.post(this.url+'/articlecoms',
      {articlecom_content:art_content,article_id:art_id,user_id:user_id}).toPromise().then(
      function (result) {
        return(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }


  //================给文章评论点赞
  articleComLike(articlecom_id):Promise<any>{
    return this.http.post(this.url+'/articlecomlike',
      {articlecom_id:articlecom_id}).toPromise().then(
      function (result) {
        return(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }


}
