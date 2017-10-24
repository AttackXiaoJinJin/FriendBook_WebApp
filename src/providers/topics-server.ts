import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import {HttpClient,HttpParams} from "@angular/common/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TopicsServerProvider {
  url: string = 'http://localhost:3001/topic';
  constructor(
    public http: Http,
    private HttpClient:HttpClient
  ) {
    console.log('Hello TopicsServerProvider Provider');
  }

  //获取全部话题
  getAlltopics():Promise<any>{

    let params = new HttpParams().set('myParam', 'myValue');
    return this.HttpClient.post(this.url+'/topicbyattent',{params:params})
      .toPromise().then(function (result) {
       return(result);
      })
  }

  //加载2个话题
  twotopics(m,n):Promise<any>{
    return this.HttpClient.post(this.url+'/twotop',{m:m,n:n})
      .toPromise().then(function (result) {
        return(result);
      })
  }









}
