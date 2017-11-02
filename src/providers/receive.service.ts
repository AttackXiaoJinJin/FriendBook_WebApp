import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams,HttpRequest} from '@angular/common/http';

@Injectable()
export class ReceiveService {

  url:string='http://101.132.127.138:3000/receive';
  constructor(private http:HttpClient) {

  }
//============添加订单
  addAddress(address,callback){
    this.http.post(this.url+'/insertreceive',address).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }
  showAddress(user_id,callback){
  // showAddress(address,callback){
  //   this.http.post(this.url+'/showreceive',address).subscribe(
    this.http.post(this.url+'/showreceive',{user_id:user_id}).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

  /*
  *   showAddress(address,callback){
    this.http.post(this.url+'/showreceive',address).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }
  * */

  delAddress(address,callback){
    this.http.post(this.url+'/deletereceive',address).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }
  checkedAddress(address,callback){
    this.http.post(this.url+'/showaddress',address).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }
}
