import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-artrecom',
  templateUrl: './artrecom.html',
})
export class ArtrecomComponent implements OnInit {
  @Input() _recomment: any;
  @Input() mainname: any;
  @Input() mainid: any;
  constructor(

  ) { }

  ngOnInit() {
  }
  togetuserid(user_id) {
    // this.router.navigate(['/personaldetail',user_id]);
  }
}
