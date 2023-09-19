import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../dashboard/dashboard.component";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { CategoriesComponent } from "app/categories/categories.component";
import { CreateComponent } from "app/categories/create/create.component";
import { CreateProductComponent } from "app/products/create-product/create-product.component";
import { ProductsComponent } from "app/products/products.component";
import { BannersComponent } from "app/banners/banners.component";
import { CreateBannerComponent } from "app/banners/create-banner/create-banner.component";
import { PurchasesUnsentComponent } from "app/purchases-unsent/purchases-unsent.component";
import { DetailsUnsentComponent } from "app/purchases-unsent/details-unsent/details-unsent.component";
import { PurchasesShippedComponent } from "app/purchases-shipped/purchases-shipped.component";
import { NgxDropzoneModule } from "ngx-dropzone";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { TranslatePipe } from "app/shared/pipes/translate.pipe";
import { MatDialogModule } from "@angular/material/dialog";
import { DetailsShippedComponent } from "app/purchases-shipped/details-shipped/details-shipped.component";
import { CustomersComponent } from "app/customers/customers.component";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table' 
import { MatSortModule } from "@angular/material/sort";
import { BranchesComponent } from "app/branches/branches.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    NgxDropzoneModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule
    

  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    CategoriesComponent,
    CreateComponent,
    ProductsComponent,
    CreateProductComponent,
    BannersComponent,
    CreateBannerComponent,
    PurchasesUnsentComponent,
    DetailsUnsentComponent,
    PurchasesShippedComponent,
    TranslatePipe,
    DetailsShippedComponent,
    CustomersComponent,
    BranchesComponent
  ],
})
export class AdminLayoutModule {}
