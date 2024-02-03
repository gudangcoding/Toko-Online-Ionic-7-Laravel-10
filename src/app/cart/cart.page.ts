import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Helper } from 'src/provider/Helper';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  products: any[] = [];
  product: any = [];
  selectAll = false;
  ceklis= false;
  total: any = 0;
  qty: any = 0;
  checkedCount = 1;

  constructor(
    private cartService: CartService,
    private router: Router,
    private util: Helper
  ) {
    this.products = cartService.getCart('cart');
    this.total = cartService.getCart('total');

    console.log('Total atas : ', this.total);
  }

  ngOnInit() {
    this.products = this.cartService.getCart('cart');
    this.total = this.cartService.getCart('total');
  }

  updateTotal() {
    localStorage.getItem('cart');
    localStorage.getItem('total');
  }

  incrementProduct(product: any) {
    this.cartService.tambahi('cart', product);
    this.calculate();
  }

  decrementProduct(product: any) {
    this.cartService.kurangi('cart', product);
    this.calculate();
  }

  loadTotal() {
    this.products = this.cartService.getCart('cart');
    this.total = this.cartService.getCart('total');
    this.total = this.cartService.getCart('qty');
  }

  calculate(){
    this.loadTotal();
    if (this.products) {
      this.checkedCount = this.products.filter((item) => item.checked).length;
      // Hapus berdasarkan produk yang di ceklis
      for (let i = 0; i <= this.checkedCount + 1; i++) {
        // this.products.splice(i, 1);
        this.total = this.products.reduce((sum: any, product: any) => {
          return sum + (product.checked ? product.price * product.quantity : 0);
        }, 0);
        this.qty = this.products.reduce((sum: any, product: any) => {
          return sum + (product.checked ? product.quantity : 0);
        }, 0);
        localStorage.setItem('total', JSON.stringify(this.total));
        localStorage.setItem('qty', JSON.stringify(this.qty));
      }
    }
   
  }

  checkAll() {
    this.products.forEach((item: any) => (item.checked = this.selectAll));
    this.cartService
      .getCart('cart')
      .forEach((product) => (product.checked = this.selectAll));

    this.total = this.products.reduce((sum: any, product: any) => {
      return sum + (product.checked ? product.price * product.quantity : 0);
    }, 0);

    this.qty = this.products.reduce((sum: any, product: any) => {
      return sum + (product.checked ? product.quantity : 0);
    }, 0);
    console.log('total bawah : ', this.total);

    localStorage.setItem('total', this.total);
    localStorage.setItem('qty', this.qty);
  }

  centangsatuan(productId: number): void {
    const cartData = JSON.parse(localStorage.getItem('cart') ?? '{}');
    const ketemu = cartData.findIndex((item: any) => item.id === productId);

    console.log(ketemu);
    if (ketemu) {
      for (let index = 0; index < cartData[productId].checked; index++) {
        this.total += cartData[index].price * cartData[index].quantity;
        this.qty += cartData[index].quantity;
      }
      console.log('Hasil Tes ', cartData[productId].name);
      localStorage.setItem('cart', JSON.stringify(cartData));
      localStorage.setItem('total', JSON.stringify(this.total));
      localStorage.setItem('qty', JSON.stringify(this.qty));
    }
    // console.log(this.total);
    // const checkbox = document.getElementById('yourCheckboxId');
  }

  delAll() {
    if (this.products) {
      const jumlahdiceklis = this.products.filter(
        (item) => item.checked
      ).length;
      console.log(jumlahdiceklis);
      // Hapus berdasarkan produk yang di ceklis
      for (let i = jumlahdiceklis - 1; i >= 0; i--) {
        this.products.splice(i, 1);
        this.total = this.products.reduce(
          (sum, product) => sum + product.price * product.quantity,
          0
        );
        this.qty = this.products.reduce(
          (sum, product) => sum + product.quantity,
          0
        );
      }
      // Update Storage
      localStorage.setItem('cart', JSON.stringify(this.products));
      localStorage.setItem('total', JSON.stringify(this.total));
    }
  }

  diceklis() {
    if (this.products) {
      this.checkedCount = this.products.filter((item) => item.checked).length;

      // Hapus berdasarkan produk yang di ceklis
      for (let i = 0; i <= this.checkedCount + 1; i++) {
        // this.products.splice(i, 1);
        this.total = this.products.reduce((sum: any, product: any) => {
          return sum + (product.checked ? product.price * product.quantity : 0);
        }, 0);
        this.qty = this.products.reduce((sum: any, product: any) => {
          return sum + (product.checked ? product.quantity : 0);
        }, 0);
        localStorage.setItem('total', JSON.stringify(this.total));
        localStorage.setItem('qty', JSON.stringify(this.qty));
      }
      console.log(
        'JUmlah Diceklis ' +
          this.checkedCount +
          ' Jumlah ' +
          this.qty +
          ' Totalnya ' +
          this.total
      );

      localStorage.setItem('cart', JSON.stringify(this.products));
    }
  }

  hapussatuan() {
    if (this.products) {
      const produkDiceklis = this.products.filter((item) => item.checked);
      // Menghitung total harga dan jumlah kuantitas dari produk yang dicentang
      this.total = produkDiceklis.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      );
      this.qty = produkDiceklis.reduce(
        (sum, product) => sum + product.quantity,
        0
      );

      // Hapus produk yang dicentang dari this.products
      this.products = this.products.filter((item) => !item.checked);

      console.log('Ini Total : ', this.total);
    }
  }

  deleteItemById(itemId: number) {
    if (this.products) {
      // console.log(itemId);

      const storedItems = JSON.parse(localStorage.getItem('cart') ?? '{}');
      // Find the index of the item with the specified ID
      const index = storedItems.findIndex((item: any) => item.id === itemId);
      console.log(index);
      // Remove the item if found
      if (index !== -1) {
        storedItems.splice(index, 1);
        // update Local Storage
        localStorage.setItem('cart', JSON.stringify(storedItems));
      }
    }
  }
}
