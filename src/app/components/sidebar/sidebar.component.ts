import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/shared/api/api.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/categories', title: 'Categorias',  icon:'list', class: '' },
    { path: '/products', title: 'Productos',  icon:'shopping_cart', class: '' },
    { path: '/branches', title: 'Sucursales',  icon:'store', class: '' },
    //{ path: '/purchase-unsent', title: 'Pedidos no enviados',  icon:'assignment_returned', class: '' },
    //{ path: '/purchase-shipped', title: 'Pedidos enviados',  icon:'done_all', class: '' },
    //{ path: '/banners', title: 'Banner de  publicidad',  icon:'new_releases', class: '' },
    //{ path: '/customers', title: 'Clientes',  icon:'people', class: '' },
    
    /*
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' }, */
    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  logout(){
    this.api.logout();
  }
}
