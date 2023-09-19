import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/api/api.service';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-purchases-unsent',
  templateUrl: './purchases-unsent.component.html',
  styleUrls: ['./purchases-unsent.component.css']
})
export class PurchasesUnsentComponent implements OnInit {

  purchaseOrders: any = [];
  purchaseOrdersUnsent: string [] = ['Accepted','Cancelled','Received','Created'];
  constructor(
    private api: ApiService,
    private router: Router
  ) { }
  ngOnInit(): void {
    console.log('ngOnInit');
    this.purchaseOrders = [];
    this.api.getPurcharseOrders({status: this.purchaseOrdersUnsent}).subscribe(response => {
      console.log(response)
      this.purchaseOrders = response.data;
    }, error => {
      console.log(error);
    })
  }

  details(id){
    this.router.navigateByUrl('purchase-unsent/' + id);
  }

}


