import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController, ViewController } from 'ionic-angular';
import {AddaddressPage} from "../addaddress/addaddress";
import {PaysuccessPage} from "../paysuccess/paysuccess";
import {BooksService} from "../../providers/books.service";
import {UsersService} from "../../providers/users.service";
import {ReceiveService} from "../../providers/receive.service";
import {GlobalPropertyService} from "../../providers/global-property.service";
import { AlertController } from 'ionic-angular';
import {constructDependencies} from "@angular/core/src/di/reflective_provider";
import {OrdersService} from "../../providers/orders.service";
import { Storage } from '@ionic/storage';


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
  receiveName:any
  receivePhone:any
  receiveAddress:any;
  testRadioOpen: boolean;
  testRadioResult;
  order_numbering: string="";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl:ModalController,
    public booksSer:BooksService,
    public viewCtrl: ViewController,
    public userSer:UsersService,
    public ReceiveService:ReceiveService,
    private  glo:GlobalPropertyService,
    public alertCtrl: AlertController,
    public OrdersService:OrdersService,
    private storage:Storage,

    ) {

  }
  // ionViewWillEnter(){
    // this.storage.ready().then(() => {
    //   this.storage.get('user_id').then((val) => {
    //     if(val){
    //       this.userId = val;
    //     }
    //   })
    // });
    //
    // this.book_id =this.navParams.get('book_id');
  // }

  ionViewDidLoad() {
  // ionViewWillEnter() {
    this.book_id=this.navParams.get('book_id');
    this.storage.ready().then(() => {
      this.storage.get('user_id').then((val) => {
        if(val){
          this.userId = val;
        }
      })
    });
    console.log(this.book_id)
    console.log(this.navParams)


    this.receive_id=0;


    // let str = '{"book_id":'+ this.book_id +'}';
    // let book_id = JSON.parse(str);
    let that=this;
    // that.booksSer.getBookdetailById(book_id,function (result) {
    that.booksSer.getBookdetailById(that.book_id+'',function (result) {
      // console.log(result);
      if (result.statusCode) {
        // that.router.navigate(['/**']);
        //404
      }else {
        that._book = result[0];
      }
    });
    // let str = '{"user_id":' + this.userId + '}';
    // let user_id = JSON.parse(str);
    that.userSer.getMoreById(that.userId+'', function (result) {
      if(!result.statusCode) {
        that._user = result[0];
      }
      console.log(that.userId);
    });



  }
  //==========init


  toAddaddress(){
    const modelPage=this.modalCtrl.create(AddaddressPage);
    modelPage.present();
  };
  toSuccess(){
    const modelPage=this.modalCtrl.create(PaysuccessPage);
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
    this.createOrderNum()
    let that = this;
    if(that.receiveAddress && that.receivePhone && that.receiveName && this.book_id && that.order_num && this.order_numbering){
    that.OrdersService.addOrder(this.book_id+'',that.userId+'',that.order_num+'',this.order_numbering+'',that.receiveName+'',that.receiveAddress+'',that.receivePhone+'',function (result) {
      console.log(that.order_num)
      console.log(that.order_numbering)
      console.log(that.receiveName)
      console.log(that.receiveAddress)
      // if (result.statusCode==91&&that.checked_address) {
      if (result.statusCode==91) {
        that.toSuccess()
      }else {
        // that.router.navigate(['/**']);
        alert('请选择地址');
      }
    });
    }else{
      alert('请选择地址');
    }

  }

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

  //点击显示收货模态框
  showCheckbox() {
    let alert = this.alertCtrl.create();
    let that=this
    alert.setTitle('请选择收货地址');
    // this.showaddress()
    // that.ReceiveService.showAddress(that.userId, function (result) {
    console.log(that.userId+"userIdddd")
    that.ReceiveService.showAddress(that.userId+'', function (result) {
      console.log(result)
      if(!result.statusCode) {
        that._addresses = result;
        for(var i=0;i<that._addresses.length;i++){
          console.log(that._addresses[i].receive_id)
          alert.addInput({

            type: 'radio',
            label: that._addresses[i].receive_name+that._addresses[i].receive_address,
            value: that._addresses[i].receive_id,
            checked: false
          });
        }

        alert.addButton('取消');
        alert.addButton({
          text: '确定',
          handler: (data) => {
            console.log('Checkbox data:', data);
            that.testRadioOpen = false;
            that.showcheckadd(data);
            that.checkAddress(data)
          }
        });
        alert.present();

      }
      // console.log(that._user);
    });

  }
  showcheckadd(data){
    for(var i=0;i<this._addresses.length;i++){
      if(this._addresses[i].receive_id==data){
        this.receiveName = this._addresses[i].receive_name
        this.receivePhone=this._addresses[i].receive_phone
        this.receiveAddress=this._addresses[i].receive_address;
      }
    }
  }

  //创建唯一的订单号
  createOrderNum(){
    let nowtime = new Date();
    this.order_numbering+=nowtime.getFullYear();
    if(nowtime.getMonth()<9){
      this.order_numbering = this.order_numbering+"0"+(nowtime.getMonth()+1);
    }else{
      this.order_numbering = this.order_numbering+(nowtime.getMonth()+1);
    }
    if(nowtime.getDate()<10){
      this.order_numbering = this.order_numbering+"0"+nowtime.getDate();
    }else{
      this.order_numbering = this.order_numbering+nowtime.getDate();
    }
    if(nowtime.getHours()<10){
      this.order_numbering = this.order_numbering+"0"+nowtime.getHours();
    }else{
      this.order_numbering = this.order_numbering+nowtime.getHours();
    }
    if(nowtime.getMinutes()<10){
      this.order_numbering = this.order_numbering+"0"+nowtime.getMinutes();
    }else{
      this.order_numbering = this.order_numbering+nowtime.getMinutes();
    }
    if(nowtime.getSeconds()<10){
      this.order_numbering = this.order_numbering+"0"+nowtime.getSeconds();
    }else{
      this.order_numbering = this.order_numbering+nowtime.getSeconds();
    }
    // this.order_numbering = this.order_numbering+sessionStorag.getItem('user_id')+this.book_id+this.order_num;
    this.order_numbering = this.order_numbering+this.userId+this.book_id+this.order_num;
  }





}
