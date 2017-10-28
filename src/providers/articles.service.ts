import { Injectable } from '@angular/core';

import {HttpClient,HttpHeaders,HttpParams,HttpRequest} from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
@Injectable()
export class ArticlesService {

  url: string = 'http://101.132.127.138:3000/article';

  constructor(private http: HttpClient,) {

  }

  getallarticles(): Promise<any> {

    let params = new HttpParams().set('myParam', 'myValue');
    return this.http.post(this.url + '/allarticles', {params: params}).toPromise().then(
      function (result) {
        return(result);
      },
      function (error) {
        console.log(error.message);
      }
    )

  }
  getArticleDetail(articleId):Promise<any> {
    return this.http.post(this.url + '/articledetail',
      {article_id: articleId}).toPromise().then(
      function (result) {
        console.log(result)
        return(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }



  // ====================下面发表文章
    insertArticle(formData,callback){
    this.http.post(this.url+'/insertArticle', formData).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  //==============获取所有评论最多文章
  getAllArticles(callback) {
    let params = new HttpParams().set('myParam', 'myValue');
    this.http.post(this.url + '/mostcomarticles', {params: params}).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

  //================搜索文章
  searchArticle(searchCon,callback){
    this.http.post(this.url+'/searcharticle',searchCon).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

  //===========显示该文章是否收藏
  showcollect(user_id,article_id){
    return this.http.post(this.url+'/showcollect',
      {user_id:user_id,article_id:article_id}).toPromise().then(
      function (result) {
        return(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

//=================点击收藏
  insertcoll(user_id,article_id):Promise<any>{
    return this.http.post(this.url+'/showcollect/insertcollect',{user_id:user_id,article_id:article_id}).toPromise().then(
      function (result) {
        return(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

  //====================点击取消收藏
  deletecoll(user_id,article_id):Promise<any>{
    return this.http.post(this.url+'/showcollect/deletecollect',
      {user_id:user_id,article_id:article_id}).toPromise().then(
      function (result) {
        return(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

  //====================显示收藏数
  showcollnum(article_id):Promise<any>{
    return this.http.post(this.url+'/showcollnum',
      {article_id:article_id}).toPromise().then(
      function (result) {
        return(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

  //==============获取三篇评论最多文章
  // threecomart(acm,acn):Promise<any> {
  threecomart(acm,acn,callback){
    // return this.http.post(this.url + '/threecomart', {acm:acm,acn:acn}).toPromise().then(
    this.http.post(this.url + '/threecomart', {acm:acm,acn:acn}).subscribe(
      function (result) {
        // return(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

  //==============获取三篇收藏最多文章
  // threecolart(acolm,acoln):Promise<any> {
  threecolart(acolm,acoln,callback) {
    return this.http.post(this.url + '/threecolart', {acolm:acolm,acoln:acoln}).toPromise().then(
      function (result) {
        // return(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }



}
