import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams,HttpRequest} from '@angular/common/http';

@Injectable()
export class OrdersService {

  url:string='http://101.132.127.138:3000/order';
  constructor(private http:HttpClient) {

  }
//通过订单id显示订单详情
  showorderbyid(order_id,callback){
  // showorderbyid(order_id,callback){
  //   this.http.post(this.url+'/showorderbyid',order_id).subscribe(
    this.http.post(this.url+'/showorderbyid',{order_id:order_id}).subscribe(
      function (result) {
        callback(result)
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

//============添加订单
  addOrder(book_id,user_id,order_num,order_bianhao,receive_name,receive_address,receive_phone,callback){
  // addOrder(order,callback){
  //   this.http.post(this.url+'/addorder',order).subscribe(
    this.http.post(this.url+'/addorder',{book_id:book_id,user_id:user_id,order_num:order_num,order_bianhao:order_bianhao,receive_name:receive_name,receive_address:receive_address,receive_phone:receive_phone}).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }
  // showOrder(user_id):Promise<any>{
  showOrder(user_id,callback){
    // return this.http.post(this.url+'/showorder',{user_id:user_id}).toPromise().then(
    this.http.post(this.url+'/showorder',{user_id:user_id}).subscribe(
      function (result) {
        // return(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }
  delOrder(order_id,callback){
    this.http.post(this.url+'/deleteorder',{order_id:order_id}).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }
}
