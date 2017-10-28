import { Injectable } from '@angular/core';

import { Http} from '@angular/http';
import {HttpClient,HttpParams} from "@angular/common/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TopicsServerProvider {
  url: string = 'http://101.132.127.138:3000/topic';
  constructor(

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

  //推荐
  getMarticletopic(callback) {
    console.log("m");
    let params = new HttpParams().set('myParam', 'myValue');
    this.HttpClient.post(this.url + '/topicbyarticle', {params: params}).subscribe(
      function (result) {
        callback(result);

      },
      function (error) {
        console.log(error.message);
      }
    );
  }

  //热门
  getMattentopic(callback) {
    let params = new HttpParams().set('myParam', 'myValue');
    this.HttpClient.post(this.url + '/topicbyattent', {params: params}).subscribe(
      function (result) {
        callback(result);
      })
  }
  //加载2个话题
  twotopics(m,n):Promise<any>{
    return this.HttpClient.post(this.url+'/twotop',{m:m,n:n})
      .toPromise().then(function (result) {
        return(result);
      })
  }

  //------------------搜索话题----------------
  searchTopic(searchCon,callback){
    // this.http.post(this.url+'/searchtopic',{searchCon:searchCon}).subscribe(
    this.HttpClient.post(this.url+'/searchtopic',searchCon).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

  //得到该用户已关注的所有话题
  showallattent(id, callback) {
    this.HttpClient.post(this.url + '/showallattent', id).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  // 该用户是否关注该话题
  showatten(user_id, topic_id, callback) {
    this.HttpClient.post(this.url + '/showattent', {user_id: user_id, topic_id: topic_id}).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  //插入关注成功
  insertatten(topicatten, callback) {
    this.HttpClient.post(this.url + '/showattent/insertattent', topicatten).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  //删除该关注
  deleteattent(topicatten, callback) {
    this.HttpClient.post(this.url + '/showattent/deleteattent', topicatten).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  getTopicById(id, callback) {
    this.HttpClient.post(this.url + '/gettopicbyid', id).subscribe(
      function (result) {
        callback(result);
        console.log("111");
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

  getHotArticleById(id, callback) {
    this.HttpClient.post(this.url + '/topicarticle', id).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  getCollectAritcleByld(id, callback) {
    this.HttpClient.post(this.url + '/topcolart', id).subscribe(
      function (result) {
        // console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

  getNewAritcleByld(id, callback) {
    this.HttpClient.post(this.url + '/topnewart', id).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }






}
