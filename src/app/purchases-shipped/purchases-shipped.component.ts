import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/api/api.service';

@Component({
  selector: 'app-purchases-shipped',
  templateUrl: './purchases-shipped.component.html',
  styleUrls: ['./purchases-shipped.component.css']
})
export class PurchasesShippedComponent implements OnInit {

  purchaseOrders: any = [];
  purchaseOrdersUnsent: string [] = ['Sent'];
  animal: string;
  name: string;
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
    this.router.navigateByUrl('purchase-shipped/' + id);
  }

}
