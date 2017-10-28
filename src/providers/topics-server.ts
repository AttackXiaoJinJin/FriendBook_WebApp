import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import {Http} from "@angular/http";

@Injectable()
export class TopicsServerProvider {
  url: string = 'http://101.132.127.138:3000/topic';
  constructor(
    private HttpClient:HttpClient
  ) {
    console.log('Hello TopicsServerProvider Provider');
  }

  //获取全部话题
  // getAlltopics():Promise<any>{
  getAlltopics(callback){

    let params = new HttpParams().set('myParam', 'myValue');
    return this.HttpClient.post(this.url+'/topicbyattent',{params:params}).subscribe(function (result) {
      // .toPromise().then(function (result) {
      //  return(result);
       callback(result);
      })
  }

  //加载2个话题
  // twotopics(m,n):Promise<any>{
  twotopics(m,n,callback){
    // this.HttpClient.post(this.url+'/twotop',{m:m,n:n}).toPromise().then(function (result) {
    this.HttpClient.post(this.url+'/twotop',{m:m,n:n}).subscribe(function (result) {
        // return(result);
        callback(result);
      })
  }

  //------------------搜索话题----------------
  searchTopic(searchCon,callback){
    this.HttpClient.post(this.url+'/searchtopic',searchCon).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }






}
