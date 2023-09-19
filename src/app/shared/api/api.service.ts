import { Injectable } from '@angular/core';
declare var $: any;
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private host = 'https://latienditadelmamado.com';
  //private host = 'http://localhost:3000';

  // private staticFiles = 'http://www.latienditadelmamado.com:6000/'
  private staticFiles = 'http://latienditadelmamado.com:3100/'
  private apiUrl = this.host + '/tienditamamado/api/v1/';
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  login(item): Observable<any> {
    return this.http
      .post(this.apiUrl + 'auth/login/administrator', item)
      .pipe(catchError(err => this.handleError(err)));
  }
  register(item): Observable<any> {
    return this.http
      .post(this.apiUrl + 'register', item)
      .pipe(catchError(err => this.handleError(err)));
  }

  logout(): boolean {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    return true;
  }
  /**
   *
   * @returns Current user id
   */
  getCurrentID() {
    return localStorage.getItem('user_id');
  }
  ////
  getCategories(): Observable<any> {
    return this.http
      .get(this.apiUrl + 'categories/', this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
  }
  getCategoryById(id): Observable<any> {
    return this.http
      .get(this.apiUrl + 'categories/'+id, this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
  }
  saveCategory(item): Observable<any> {
    if(item.id!=''){
      const id = item.id;
      delete item.id;
      return this.http
      .put(this.apiUrl + 'categories/'+id,item, this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
    }else{
      delete item.id;
      return this.http
      .post(this.apiUrl + 'categories/',item, this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
    }
    
  }

  deleteCategory(id){
    return this.http
    .delete(this.apiUrl + 'categories/'+id ,this.getOptions())
    .pipe(catchError(err => this.handleError(err)));
  }

  //Products
  getProducts(): Observable<any> {
    return this.http
      .get(this.apiUrl + 'products/', this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
  }
  getProductsByCategory(id): Observable<any> {
    return this.http
      .get(this.apiUrl + 'getProductsByCategory/'+id, this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
  }
  getProductById(id): Observable<any> {
    return this.http
      .get(this.apiUrl + 'products/'+id, this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
  }
  saveProduct(item): Observable<any> {
    if(item.id!=''){
      const id = item.id;
      delete item.id;
      item.productImages != '' ? '' : delete item.productImages;
      return this.http
      .put(this.apiUrl + 'products/'+id,item, this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
    }else{
      delete item.id;
      return this.http
      .post(this.apiUrl + 'products/',item, this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
    }
    
  }

  deleteProduct(id){
    return this.http
    .delete(this.apiUrl + 'products/'+id ,this.getOptions())
    .pipe(catchError(err => this.handleError(err)));
  }

  //Purchase orders

  //get unsent purchase orders
  getPurcharseOrders(params?:any): Observable<any>{
    return this.http
    .get(this.apiUrl + 'purchase-order', this.getOptions(params))
    .pipe(catchError(err => this.handleError(err)));
  }

  //get purchase order details
  getPurchaseOrderDetail(id:any): Observable<any>{
    return this.http
    .get(this.apiUrl + 'purchase-order/'+id, this.getOptions())
    .pipe(catchError(err => this.handleError(err)));
  }

  updatePurchaseOrder(item:any): Observable<any>{
    const id = item.id;
    delete item.id;
    return this.http
    .put(this.apiUrl+ 'purchase-order/'+id, item , this.getOptions())
    .pipe(catchError(err => this.handleError(err)));
  }


  //User
  getUser(): Observable<any> {
    let id = localStorage.getItem('user_id');
    return this.http
      .get(this.apiUrl + 'getUser/'+id, this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
  }

  updateUser(item:any): Observable<any> {
    let id = localStorage.getItem('user_id');
    return this.http
      .put(this.apiUrl + 'updateUser/'+id,item, this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
  }

  getAddresses(){
    let id = localStorage.getItem('user_id');
    return this.http
    .get(this.apiUrl + 'getShippingAddressUser/'+id, this.getOptions())
    .pipe(catchError(err => this.handleError(err)));
  }

  saveAddress(item:any){
    return this.http
    .post(this.apiUrl+'addresses/',item,this.getOptions())
    .pipe(catchError(err => this.handleError(err)));
  }

  createOrder(item:any){
    return this.http
    .post(this.apiUrl+'purchaseOrder/',item,this.getOptions())
    .pipe(catchError(err => this.handleError(err)));
  }
  getPurchases(){
    return this.http
    .get(this.apiUrl + 'getAllPurchases/'+ this.getCurrentID(), this.getOptions())
    .pipe(catchError(err => this.handleError(err)));
  }

  getAddress(id){
    return this.http
    .get(this.apiUrl + 'addresses/'+id, this.getOptions())
    .pipe(catchError(err => this.handleError(err)));
  }

  updateAddress(item:any,id){
    return this.http
    .put(this.apiUrl + 'addresses/'+id,item ,this.getOptions())
    .pipe(catchError(err => this.handleError(err)));
  }

  deleteAddress(id){
    return this.http
    .delete(this.apiUrl + 'addresses/'+id ,this.getOptions())
    .pipe(catchError(err => this.handleError(err)));
  }

  uploadFiles(body:any): Observable<any>{
    return this.http.post<any>(this.staticFiles+'upload',body)
    .pipe(catchError((err)=> this.handleError(err)));

  }


  deletFiles(body:any): Observable<any>{
    return this.http.post<any>(this.staticFiles+'deleteFiles',body)
    .pipe(catchError((err)=>this.handleError(err)));
  }


  //Customers
  getAllcustomers(params?:any): Observable<any>{
    return this.http
    .get(this.apiUrl + 'customers', this.getOptions(params))
    .pipe(catchError(err => this.handleError(err)));
  }
  /////

  getOptions(params? : any): any {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }),
      params
    };
    return httpOptions;
  }
  // Control de errores
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was:`);
      console.log(error.error);
    }
    if (error.status === 403) {
      this.logout();
    }

    if(error.error.message == 'Invalid Credentials'){
      let message = '<b>Credenciales Invalidas</b> por favor intente otra vez.'
      this.showNotification('top','right',3,message);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }

  showNotification(from, align,color, message){
    const type = ['info','success','warning','danger'];

    //const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "notifications",
        message
    },{
        type: type[color],
        timer: 4000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">error</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}

}
