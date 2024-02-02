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
  product: any = [];
  selectAll = false;
  total: any = 0;

  constructor(private cartService: CartService, private router: Router) {
    this.products = cartService.getCart('cart');
    this.total = cartService.getCart('total');
    console.log('Total atas : ', this.total);
  }

  ngOnInit() {
    this.loadTotal();
  }

  updateTotal() {
    localStorage.getItem('cart');
    localStorage.getItem('total');
  }

  incrementProduct(product: any) {
    this.cartService.tambahi('cart', product);
    this.loadTotal();
  }

  decrementProduct(product: any) {
    this.cartService.kurangi('cart', product);
    this.loadTotal();
  }

  loadTotal() {
    this.cartService.getCart('cart');
    this.cartService.getCart('total');
  }

  checkAll() {
    this.cartService.TotalHarga();
    this.cartService.TotalQty();
    this.products.forEach((item: any) => (item.checked = this.selectAll));
    this.cartService
      .getCart('cart')
      .forEach((product) => (product.checked = this.selectAll));

    this.total = this.products.reduce((sum: any, product: any) => {
      return sum + (product.checked ? product.price * product.quantity : 0);
    }, 0);
    console.log('total bawah : ', this.total);

    localStorage.setItem('total', this.total);
   this.loadTotal();
  }

  centangsatuan(productId: number): void {
   
  
    this.cartService.centangStatus(productId);
   
    // const cartData = JSON.parse(localStorage.getItem('cart') ?? '{}');
    // console.log(cartData);
    // // if (cartData[productId]) {
    //   for (let index = 0; index < cartData[productId].checked; index++) {
    //     this.total += cartData[index].price * cartData[index].quantity; 
    //   }
    //   console.log('Hasil Tes ',cartData[productId].name);
    //   localStorage.setItem('cart', JSON.stringify(cartData));
    //   localStorage.setItem('total', JSON.stringify(this.total));
    // // }
  }

  delAll() {
    if (this.products) {
      const jumlahdiceklis = this.products.filter(item => item.checked).length;
      console.log(jumlahdiceklis);
      // Hapus berdasarkan produk yang di ceklis
      for (let i = jumlahdiceklis - 1; i >= 0; i--) {
        this.products.splice(i, 1);
      }
      // Update Storage
      localStorage.setItem('cart', JSON.stringify(this.products));
    }
  }

  calculateTotal() {
    this.total = this.products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  }
 

}
