import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/shared/api/api.service';

@Component({
  selector: 'app-details-shipped',
  templateUrl: './details-shipped.component.html',
  styleUrls: ['./details-shipped.component.css']
})
export class DetailsShippedComponent implements OnInit {
  purchaseOrderId = "";
  purchaseOrderDetail: any;
  customerFullName: string;

  constructor(
    private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.purchaseOrderId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.purchaseOrderId);
    if (this.purchaseOrderId) {
      this.api.getPurchaseOrderDetail(this.purchaseOrderId).subscribe(response => {
        console.log(response)
        this.purchaseOrderDetail = response;
        this.customerFullName =  this.purchaseOrderDetail.customer.name +' '+ this.purchaseOrderDetail.customer.lastName;
      }, error => {
        console.error(error);
      })
    }
  }

}
