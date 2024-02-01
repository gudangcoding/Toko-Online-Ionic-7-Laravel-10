import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  products: any[] = [];
  selectAll = false;
  total: any = 0;

  constructor(private cartService: CartService, private router: Router) {
    this.products = cartService.getCart('cart');
    this.total = this.cartService.getTotalPrice();
    console.log('Total : ', this.products);
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.loadCart();
    this.loadTotal();
  }

  updateTotal() {
    this.total = this.cartService.getTotalPrice();
  }

  // toggleSelectAll() {
  //   this.cartService.toggleSelectAll(this.selectAll);
  // }

  incrementProduct(product: any) {
    this.cartService.tambahi('cart', product);
    this.updateTotal();
  }

  decrementProduct(product: any) {
    this.cartService.kurangi('cart', product);
    this.updateTotal();
  }

  loadCart() {
    this.cartService.getCart('cart');
    this.products = this.cartService.getCart('cart');
    this.loadTotal();
  }

  loadTotal() {
    this.total = this.cartService.getTotalPrice();
  }

  checkAll() {
    this.cartService.getTotalPrice();
    this.products.forEach((item: any) => (item.checked = this.selectAll));
    this.cartService
      .getCart('cart')
      .forEach((product) => (product.checked = this.selectAll));
    this.loadTotal();
    
  }

  toggleCheckStatus(productId: number): void {
    this.cartService.toggleCheckStatus(productId);
    this.loadTotal();
  }

  delAll() {
    
    if (this.cartService.getCart('cart')) {
      const jumlahdiceklis = this.cartService.getCart('cart').filter(item => item.checked).length;
      console.log('JUmlah di ceklist : ',jumlahdiceklis);
      
      // Hapus berdasarkan produk yang di ceklis
      // for (let i = jumlahdiceklis - 1; i >= 0; i--) {
      //   this.cartService.getCart('cart').splice(i, 1);
      // }
      // // Update Storage
      // localStorage.setItem('cart', JSON.stringify(this.cartService.getCart('cart')));
    }
  }
}
