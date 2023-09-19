import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/api/api.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: any = [];
  purchaseOrdersUnsent: string [] = ['Accepted','Cancelled','Received','Created'];
  constructor(
    private api: ApiService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.customers = [];
    this.api.getAllcustomers({status: this.purchaseOrdersUnsent}).subscribe(response => {
      console.log(response)
      this.customers = response;
    }, error => {
      console.log(error);
    })
  }

}
