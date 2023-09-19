import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { CategoriesComponent } from 'app/categories/categories.component';
import { CreateComponent } from 'app/categories/create/create.component';
import { CreateProductComponent } from 'app/products/create-product/create-product.component';
import { ProductsComponent } from 'app/products/products.component';
import { BannersComponent } from 'app/banners/banners.component';
import { CreateBannerComponent } from 'app/banners/create-banner/create-banner.component';
import { PurchasesUnsentComponent } from 'app/purchases-unsent/purchases-unsent.component';
import { DetailsUnsentComponent } from 'app/purchases-unsent/details-unsent/details-unsent.component';
import { PurchasesShippedComponent } from 'app/purchases-shipped/purchases-shipped.component';
import { DetailsShippedComponent } from 'app/purchases-shipped/details-shipped/details-shipped.component';
import { CustomersComponent } from 'app/customers/customers.component';
import { BranchesComponent } from 'app/branches/branches.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'categories/:id', component: CreateComponent },
    { path: 'categories-new', component: CreateComponent },
    { path: 'products', component: ProductsComponent},
    { path: 'products/:id', component: CreateProductComponent },
    { path: 'products-new', component: CreateProductComponent },
    //{ path: 'banners', component: BannersComponent},
    //{ path: 'banners/:id', component: CreateBannerComponent },
    //{ path: 'banners-new', component: CreateBannerComponent },
    //{ path: 'purchase-unsent', component: PurchasesUnsentComponent},
    //{ path: 'purchase-unsent/:id', component: DetailsUnsentComponent},
    //{ path: 'purchase-shipped', component: PurchasesShippedComponent},
    //{ path: 'purchase-shipped/:id', component: DetailsShippedComponent},
    //{ path: 'customers', component: CustomersComponent},
    { path: 'branches', component: BranchesComponent},
    
];
