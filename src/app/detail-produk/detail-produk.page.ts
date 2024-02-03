// import { CartService } from 'src/app/cart.service';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animation, AnimationController } from '@ionic/angular';
import { RestApi } from 'src/provider/RestApi';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-detail-produk',
  templateUrl: './detail-produk.page.html',
  styleUrls: ['./detail-produk.page.scss'],
})
export class DetailProdukPage implements OnInit {
  productId: any;
  products: any = [];
  selectedSize: any = '';
  selectedColor: any = '';
  activeVariation: any = '';

  @ViewChild('.colors') colors: any = ElementRef;
  @ViewChild('.sizes') sizes: any = ElementRef;
  product: any;
  constructor(
    private animatioCntrl: AnimationController,
    private route: ActivatedRoute,
    private api: RestApi,
    private http: HttpClient,
    private cart: CartService,
    private router: Router,
    private cartService : CartService

  ) {
    this.route.queryParams.subscribe((params: any) => {
      this.productId = params.id;
      console.log(this.productId);
      
    });
  }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.http.get('https://dummyjson.com/products/'+this.productId).subscribe((res: any) => {
      console.log(res);
      this.products = res;
    });
  }

  isWishlistAdded: boolean = false;
  addToWishlist(productid:number){
    this.isWishlistAdded = !this.isWishlistAdded;
    console.log(this.isWishlistAdded);
    if (this.isWishlistAdded==true) {
      this.product = {
        id: this.products.id,
        name: this.products.title,
        price: this.products.price,
        gambar: this.products.thumbnail,
      };
      this.cartService.addToCart('whistlist',this.product);
    }else{
        this.removeProduct(productid);
    }
    
  }

  removeProduct(productId: number) {
    const products =  JSON.parse(localStorage.getItem('whistlist') ?? '{}');
    const ketemu = products.filter((product: any) => product.id !== productId);
    console.log('ketemu : ',ketemu);
    localStorage.setItem('whistlist', ketemu);
  }

  addToCart() {
    this.product = {
      id: this.products.id,
      name: this.products.title,
      price: this.products.price,
      gambar: this.products.thumbnail,
    };
    this.cartService.addToCart('cart',this.product);
    // this.router.navigateByUrl('/home/cart');
  }

  buy() {
    this.product = {
      id: this.products.id,
      name: this.products.title,
      price: this.products.price,
      gambar: this.products.thumbnail,
      quantity: 1,
    };
    this.cartService.addToCart('cart',this.product);
    this.router.navigateByUrl('/home/cart');
  }

  segmentChanged(e: any) {
    this.activeVariation = e.detail.value;
    if (this.activeVariation == 'color') {
      this.animatioCntrl
        .create()
        .addElement(this.colors.nativeElement)
        .duration(500)
        .iterations(1)
        .fromTo('transform', 'translateX(0px)', 'translateX(100%)')
        .fromTo('opacity', '1', '0.2')
        .play();
      this.animatioCntrl
        .create()
        .addElement(this.colors.nativeElement)
        .duration(500)
        .iterations(1)
        .fromTo('transform', 'translateX(-100%)', 'translateX(0)')
        .fromTo('opacity', '0.2', '1')
        .play();
    } else {
      this.animatioCntrl
        .create()
        .addElement(this.sizes.nativeElement)
        .duration(500)
        .iterations(1)
        .fromTo('transform', 'translateX(100%)', 'translateX(0)')
        .fromTo('opacity', '0.2', '1')
        .play();
      this.animatioCntrl
        .create()
        .addElement(this.colors.nativeElement)
        .duration(500)
        .iterations(1)
        .fromTo('transform', 'translateX(0px)', 'translateX(-100%)')
        .fromTo('opacity', '1', '0.2')
        .play();
    }
  }

  changeSize(size: number) {
    this.selectedSize = size;
  }

  changeColor(color: number) {
    this.selectedColor = color;
  }
}
