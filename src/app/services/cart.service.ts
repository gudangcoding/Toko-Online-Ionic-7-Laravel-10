import { Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cart: any[] = [];
  public totalPrice: any = 0;
  public totalItem: any;
  public grandTotal: any = 0;
  public itemId: any[] = [];

  cartKey: any = '';
  products: any = [];
  total: any = 0;

  getCart(cartKey: any): any[] {
    const cartData = localStorage.getItem(cartKey);
    return cartData ? JSON.parse(cartData) : [];
  }

  addToCart(cartKey: any, product: any): void {
    const cart = this.getCart(cartKey);
    const existingProduct = cart.find((p) => p.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
  }

  hapus(cartKey: any, productId: number): void {
    const cartData = JSON.parse(localStorage.getItem(cartKey) ?? '{}');
    if (cartData[productId]) {
      delete cartData[productId]; // Menghapus item berdasarkan productId
      localStorage.setItem(cartKey, JSON.stringify(cartData));
    }
  }

  hapusbyID() {
    const cartKey = 'cart';
    const cartData = JSON.parse(localStorage.getItem(cartKey) ?? '{}');

    for (const productId in cartData) {
      if (cartData.hasOwnProperty(productId) && cartData[productId].checked) {
        delete cartData[productId];
      }
    }
    localStorage.setItem(cartKey, JSON.stringify(cartData));
  }

  clearCart(cartKey: any): void {
    localStorage.removeItem(cartKey);
  }

  tambahi(cartKey: any, product: any) {
    const cart = this.getCart(cartKey);
    const existingProduct = cart.find((p) => p.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
  }

  kurangi(cartKey: any, product: any): void {
    const cart = this.getCart(cartKey);
    const existingProduct = cart.find((p) => p.id === product.id);

    if (existingProduct) {
      existingProduct.quantity -= 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
  }

  TotalHarga(): number {
    const cartData = JSON.parse(localStorage.getItem('cart') ?? '{}');
    let total = 0;

    for (const productId in cartData) {
      if (cartData.hasOwnProperty(productId) && cartData[productId].checked) {
        console.log(cartData[productId]);

        total += cartData[productId].price * cartData[productId].quantity;
      }
    }

    return total;
  }

  TotalQty(): number {
    const cartData = JSON.parse(localStorage.getItem('cart') ?? '{}');
    let total = 0;

    for (const productId in cartData) {
      if (cartData.hasOwnProperty(productId) && cartData[productId].checked) {
        console.log(cartData[productId]);

        total += cartData[productId].quantity;
      }
    }

    return total;
  }

  centangStatus(productId: number): void {
    
    const cartData = JSON.parse(localStorage.getItem('cart') ?? '{}');
   
    this.total = 0;
    if (cartData[productId]) {
      cartData[productId].checked = !cartData[productId].checked;    
      // for (let index = 0; index < cartData[productId].checked.length; index++) {
      for (let index = 0; index < cartData[productId].checked; index++) {
        this.total += cartData[index].price * cartData[index].quantity;
        
        
      }
      console.log(cartData[productId].name);
      localStorage.setItem('cart', JSON.stringify(cartData));
      localStorage.setItem('total', JSON.stringify(this.total));
    }
    // console.log(this.total);
    
  }

  hitungcentang(): number {
    const cartData = JSON.parse(localStorage.getItem('cart') ?? '{}');
    let count = 0;

    for (const productId in cartData) {
      if (cartData.hasOwnProperty(productId) && cartData[productId].checked) {
        count += 1;
      }
    }

    return count;
  }

  checkout() {
    const param: NavigationExtras = {
      queryParams: {
        from: 'cart',
      },
    };
  }
}
