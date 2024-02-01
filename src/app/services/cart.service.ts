import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
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
    localStorage.setItem('total', this.total);
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
    localStorage.setItem('total', this.total);
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

  updateTotal(cartKey: any): void {
    this.total = this.products.reduce((acc: any, product: any) => {
      return acc + (product.checked ? product.price * product.quantity : 0);
    }, 0);

    this.addToCart(cartKey, this.total);
  }

  getTotalPrice(): number {
    const cartData = JSON.parse(localStorage.getItem('cart') ?? '{}');
    let total = 0;

    for (const productId in cartData) {
      if (cartData.hasOwnProperty(productId) && cartData[productId].checked) {
        total += cartData[productId].price * cartData[productId].quantity;
      }
    }

    return total;
  }

  toggleCheckStatus(productId: number): void {
    const cartData = JSON.parse(localStorage.getItem('shoppingCart') ?? '{}');

    if (cartData[productId]) {
      cartData[productId].checked = !cartData[productId].checked;
      localStorage.setItem('shoppingCart', JSON.stringify(cartData));
    }
  }
  
}
