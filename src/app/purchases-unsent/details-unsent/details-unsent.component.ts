import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/shared/api/api.service';
import Swal from 'sweetalert2'

interface Statuses {
  value: string;
  viewValue: string;
}

declare var $: any;

@Component({
  selector: 'app-details-unsent',
  templateUrl: './details-unsent.component.html',
  styleUrls: ['./details-unsent.component.css']
})
export class DetailsUnsentComponent implements OnInit {

  purchaseOrderId = "";
  purchaseOrderDetail: any;
  customerFullName: string;
  formPurchaseOrder: FormGroup;
  statuses: Statuses[] = [
    {value: 'Created', viewValue: 'Creado'},
    {value: 'Cancelled', viewValue: 'Cancelado'},
    {value: 'Received', viewValue: 'Recibido'},
    {value: 'Accepted', viewValue: 'Aceptado'},
    {value: 'Sent', viewValue: 'Enviado'},
  ];
  constructor(
    private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formPurchaseOrder = this.formBuilder.group({
      id: [''],
      status: ['', Validators.required]
    })
    
    this.purchaseOrderId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.purchaseOrderId);
    if (this.purchaseOrderId) {
      this.api.getPurchaseOrderDetail(this.purchaseOrderId).subscribe(response => {
        console.log(response)
        this.purchaseOrderDetail = response;
        this.customerFullName =  this.purchaseOrderDetail.customer.name +' '+ this.purchaseOrderDetail.customer.lastName;
        this.formPurchaseOrder.get('id').setValue(response.id);
        this.formPurchaseOrder.get('status').setValue(response.status);
      }, error => {
        console.error(error);
      })
    }
  }

  save() {
    try {
      Swal.fire({
        title: '¿Está seguro de guardar este estatus?',
        text: '¡Ésta acción no puede deshacerse!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, guardar estatus!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            title: 'PROCESANDO',
            text: 'AGUARDA UN MOMENTO POR FAVOR.',
            showConfirmButton: false,
            onBeforeOpen: () => {
              Swal.showLoading();
            }
          });
          this.api.updatePurchaseOrder(this.formPurchaseOrder.value).subscribe(response => {
            console.log(response);
            Swal.close();
            Swal.fire({
              title: 'Movimiento correcto',
              text: "El estatus ha sido actualizado correctamente",
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigateByUrl('purchase-unsent');
              }
            })
          }, error => {
            Swal.fire(
              'Ocurrió un error al actualizar el estatus',
              'Por favor contacta al administrador',
              'error'
            )
            console.log(error);
          })
        }
      })
    } catch (error) {

    }
  }

}
