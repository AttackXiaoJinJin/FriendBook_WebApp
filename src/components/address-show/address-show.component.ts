import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {GlobalPropertyService} from "../../providers/global-property.service";

@Component({
  selector: 'app-address-show',
  templateUrl: './address-show.component.html',

})
export class AddressShowComponent implements OnInit {

  @Input() _address:any;
  @Output() checkAddress = new EventEmitter();
  check_receive_id:any;
  constructor(
    private  glo:GlobalPropertyService,
  ) { }

  ngOnInit() {
    console.log(this._address)
  }
  ngAfterContentChecked(){
    this.check_receive_id=this.glo.receive_id;
  }
  check(){
    this.checkAddress.emit(true);
  }
}
