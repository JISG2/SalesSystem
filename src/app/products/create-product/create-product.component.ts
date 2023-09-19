import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/shared/api/api.service';
declare var $: any;
import Swal from 'sweetalert2'
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  productId = "";
  formProduct: FormGroup;
  categories: any = [];
  specifications = [];
  mainFeatures = [];
  coverImage: File[] = [];
  productImages: File[] = [];
  updateImages = true;
  displayToggle = false;
  uris: any[] = [];
  inputDiscount = true;
  constructor(
    private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formProduct = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      category_id: ['', Validators.required],
      price: [''],
      sku: ['', Validators.required],
      stock: ['', Validators.required],
      specifications: [''],
      mainFeatures: [''],
      coverImage: [''],
      productImages: ['']
    })
    this.api.getCategories().subscribe(response => {
      console.log(response)
      this.categories = response;
    }, error => {
      console.log(error);
    });
    this.addMainFeature();
    this.addSpecification();
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.productId) {
      this.api.getProductById(this.productId).subscribe(response => {
        console.log(response)
        this.formProduct.get('name').setValue(response.name);
        this.formProduct.get('description').setValue(response.description);
        this.formProduct.get('id').setValue(response.id);
        this.formProduct.get('category_id').setValue(response.category.id);
        this.formProduct.get('sku').setValue(response.sku);
        this.formProduct.get('stock').setValue(response.stock);
        this.formProduct.get('price').setValue(response.price);
        this.formProduct.get('coverImage').setValue(response.coverImage);
        this.specifications = JSON.parse(response.specifications) ? JSON.parse(response.specifications) : [];
        this.mainFeatures = JSON.parse(response.mainFeatures) ? JSON.parse(response.mainFeatures) : [];
        this.updateImages = false;
        this.displayToggle = true;
        this.uris.push({ "path": response.coverImage.replace('http://latienditadelmamado.com:3100/', '') });
        for (let i = 0; i < response.images.length; i++) {
          let path = response.images[i].image;
          this.uris.push({ "path": path.replace('http://latienditadelmamado.com:3100/', '') });
        }
        console.log(this.uris);

      }, error => {
        console.error(error);
      })
    }
  }

  save() {
    try {
      if (this.mainFeatures.length > 0 && this.specifications.length > 0) {
        this.formProduct.get('specifications').setValue(JSON.stringify(this.specifications));
        this.formProduct.get('mainFeatures').setValue(JSON.stringify(this.mainFeatures));
        if (this.updateImages) {
          if (this.coverImage.length > 0 && this.productImages.length > 0) {
            let form = new FormData();
            form.append('uris', JSON.stringify(this.uris))
            Swal.fire({
              title: '¿Está seguro de guardar este producto?',
              text: '¡Ésta acción no puede deshacerse!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Si, guardar producto!',
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
                })
                this.api.deletFiles(form).subscribe(response => {
                  console.log(response);
                  let formData = new FormData();
                  formData.append('files', this.coverImage[0]);
                  this.api.uploadFiles(formData).subscribe(response => {
                    console.log(response[0]);
                    let pathCoverImage = response;
                    this.formProduct.get('coverImage').setValue(pathCoverImage[0].path);
                    formData = new FormData();
                    for (let i = 0; i < this.productImages.length; i++) {
                      formData.append('files', this.productImages[i]);
                    }
                    this.api.uploadFiles(formData).subscribe(response => {
                      let pathProductImage = response;
                      this.formProduct.get('productImages').setValue(JSON.stringify(pathProductImage));
                      this.api.saveProduct(this.formProduct.value).subscribe(response => {
                        console.log(response);
                        Swal.close();
                        Swal.fire({
                          title: 'Movimiento correcto',
                          text: "El producto ha sido guardado correctamente",
                          icon: 'success',
                          confirmButtonColor: '#3085d6',
                          confirmButtonText: 'OK'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            this.router.navigateByUrl('products');
                          }
                        })
                      }, error => {
                        Swal.fire(
                          'Ocurrió un error al guardar el producto',
                          'Por favor contacta al administrador',
                          'error'
                        )
                        console.log(error);
                      })
                    }, error => {
                      Swal.fire(
                        'Ocurrió un error al guardar las imagenes del producto',
                        'Por favor contacta al administrador',
                        'error'
                      )
                      console.log('error al guardar imagenes del producto: ' + error)
                    })
                  }, error => {
                    Swal.fire(
                      'Ocurrió un error al guardar la imagen de portada',
                      'Por favor contacta al administrador',
                      'error'
                    )
                    console.log('error al guardar coverImage: ' + error);
                  })
                })
              }
            })

          } else {
            Swal.fire(
              '¡Faltan imágenes!',
              'Por favor de agregar las imagenes correspondientes',
              'warning'
            )
            console.log('Falta agregar imagenes: ');
          }
        } else {
          Swal.fire({
            title: '¿Está seguro de guardar este producto?',
            text: '¡Ésta acción no puede deshacerse!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, guardar producto!',
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
              })

              this.api.saveProduct(this.formProduct.value).subscribe(response => {
                console.log(response);
                Swal.close();
                Swal.fire({
                  title: 'Movimiento correcto',
                  text: "El producto ha sido guardado correctamente",
                  icon: 'success',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'OK'
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.router.navigateByUrl('products');
                  }
                })
              }, error => {
                console.log(error);
                Swal.fire(
                  'Ocurrió un error al guardar el producto',
                  'Por favor contacta al administrador',
                  'error'
                )
                console.log(error);
              })
            }
          })
        }

      } else {
        Swal.fire(
          '¡Faltan especificaciones y/o carácteristicas!',
          'Por favor de agregar al menos una carácteristica y una especificación',
          'warning'
        )
        console.log('Faltan especificaciones');
        this.showNotification('Por favor de agregar al menos una especificacion y caracteristica principal', 'warning');
      }
    } catch (error) {

    }
  }

  changeKeySpecifications(event, i) {
    this.specifications[i].key = event.target.value;
  }
  changeValueSpecifications(event, i) {
    this.specifications[i].value = event.target.value;
  }
  changeKeyMainFeatures(event, i) {
    this.mainFeatures[i].key = event.target.value;
  }
  changeValueMainFeatures(event, i) {
    this.mainFeatures[i].value = event.target.value;
  }
  showNotification(message, type) {
    //const type = ['info','success','warning','danger'];
    $.notify({
      icon: "notifications",
      message: message
    }, {
      type: type,
      timer: 4000,
      placement: {
        from: 'top',
        align: 'right'
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

  addSpecification() {
    let item = {
      key: "",
      value: ""
    }
    this.specifications.push(item);
  }
  addMainFeature() {
    let item = {
      key: "",
      value: ""
    }
    this.mainFeatures.push(item);
  }


  onSelect(event, type) {
    if (type === 'coverImage') {
      this.coverImage = [];
      this.coverImage.push(...event.addedFiles);
    } else {
      this.productImages.push(...event.addedFiles);
    }
  }

  onRemove(event, type) {
    console.log(event);
    if (type === 'coverImage') {
      this.coverImage.splice(this.coverImage.indexOf(event), 1);
    } else {
      this.productImages.splice(this.productImages.indexOf(event), 1);
    }
  }

  deleteOption(event, type) {
    if (type === 'specification') {
      this.specifications.splice(this.specifications.indexOf(event), 1);
    } else {
      this.mainFeatures.splice(this.mainFeatures.indexOf(event), 1);
    }

  }

  displayImages() {
    this.updateImages = !this.updateImages;
  }

}
