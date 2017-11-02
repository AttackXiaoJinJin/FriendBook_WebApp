import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams,HttpRequest} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class BooksService {
  url:string='http://101.132.127.138:3000/books';
  constructor(private http:HttpClient) {
  }

  //===================获取评论最多书籍
  mostcombooks(callback){
    let params = new HttpParams().set('myParam', 'myValue');
    this.http.post(this.url+'/mostcombooks',{params:params}).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

  //==============通过id获取书籍详情
  getBookdetailById(book_id,callback){
  // getBookdetailById(book_id,callback){
  //   this.http.post(this.url+'/bookdetail',book_id).subscribe(
    this.http.post(this.url+'/bookdetail',{book_id:book_id}).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

  //===============获取所有书籍
  getAllBooks(callback){
    let params = new HttpParams().set('myParam','myValue');
    this.http.post(this.url+'/allbooks',{params:params}).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

//==============搜索书籍
  searchBook(searchCon,callback){
    //                            /路由        参数        (要根据后台服务判断需不需要参数)
    this.http.post(this.url+'/searchbook',searchCon).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

//===========显示该书籍是否喜欢
  showlove(booklove,callback){
    this.http.post(this.url+'/showlove',booklove).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

//============点击喜欢
  insertlove(booklove,callback){
    this.http.post(this.url+'/showlove/insertlove',booklove).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

  //====================点击取消喜欢
  deletelove(booklove,callback){
    this.http.post(this.url+'/showlove/deletelove',booklove).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }


  //===================加载3个
  // threebooks(bm,bn):Promise<any>{
  threebooks(bm,bn,callback){
    // return this.http.post(this.url+'/threebooks',{bm:bm,bn:bn}).toPromise().then(
    this.http.post(this.url+'/threebooks',{bm:bm,bn:bn}).subscribe(
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
