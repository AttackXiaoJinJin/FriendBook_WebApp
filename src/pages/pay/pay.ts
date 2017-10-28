import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController, ViewController } from 'ionic-angular';
import {AddaddressPage} from "../addaddress/addaddress";
import {PaysuccessPage} from "../paysuccess/paysuccess";
import {BooksService} from "../../providers/books.service";
import {UsersService} from "../../providers/users.service";
import {ReceiveService} from "../../providers/receive.service";
import {GlobalPropertyService} from "../../providers/global-property.service";



@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
  // providers:[BooksService]
})
export class PayPage {
  receive_id:any
  userId:any;
  order_num: any=1;
  _book: any;
  items: any;
  all_items:any;
  book_id: any;
  _user: any;
  _addresses:any;
  checked_address:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl:ModalController,
    public booksSer:BooksService,
    public viewCtrl: ViewController,
    public userSer:UsersService,
    public ReceiveService:ReceiveService,
    private  glo:GlobalPropertyService,
    ) {

  }

  ionViewDidLoad() {
    // if(!sessionStorage.getItem('user_id')){
    //   this.router.navigate(['/login']);
    // }

    this.receive_id=0;
    this.book_id =1;
    this.userId=6
    let str = '{"book_id":'+ this.book_id +'}';
    let book_id = JSON.parse(str);
    let that=this;
    that.booksSer.getBookdetailById(book_id,function (result) {
      // console.log(result);
      if (result.statusCode) {
        // that.router.navigate(['/**']);
        //404
      }else {
        that._book = result[0];
      }
    });
    str = '{"user_id":' + this.userId + '}';
    let user_id = JSON.parse(str);
    that.userSer.getMoreById(user_id, function (result) {
      if(!result.statusCode) {
        that._user = result[0];
      }
      // console.log(that._user);
    });
    that.ReceiveService.showAddress(user_id, function (result) {
      if(!result.statusCode) {
        that._addresses = result;
      }
      // console.log(that._user);
    });


  }
  //==========init


  toAddaddress(){
    const modelPage=this.modalCtrl.create(AddaddressPage);
    modelPage.present();
  };

  cut(){
    if(this.order_num>1){
      this.order_num-=1;
    }
  }
  add(){
    this.order_num += 1;
  }
  tobuy(){
      if(this.checked_address){
        const modelPage=this.modalCtrl.create(PaysuccessPage);
        modelPage.present();
      }else{
        alert('请选择地址');
      }

  };
  // toPaySecond(){
  //   if(this.checked_address){
  //     // this.router.navigate(['/paysecond',this.book_id,this.order_num,(this.order_num*this._book.book_price).toFixed(2),this.glo.receive_id]);
  //
  //   }else{
  //     alert('请选择地址');
  //   }
  // }
  checkAddress(receiveid){
    console.log('qqq');
    this.glo.receive_id=receiveid;
    console.log(receiveid+"this is rece-id")
    // this.receive_id=receiveid;
    // console.log(this.glo.receive_id);
    // let str = '{"receive_id":'+ this.glo.receive_id +'}';
    let str = '{"receive_id":'+ this.glo.receive_id +'}';
    let receive_id = JSON.parse(str);
    let that=this;
    that.ReceiveService.checkedAddress(receive_id, function (result) {
      // console.log(result);
      if(!result.statusCode) {
        that.checked_address = result[0].receive_address;
      }
    });
  }


  back(){
    this.navCtrl.pop();
    // this.navCtrl.push(TabsPage);
    // this.viewCtrl.dismiss({"newName":"lzhan"});

  }

}
