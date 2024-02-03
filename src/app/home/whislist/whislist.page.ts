import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Helper } from 'src/provider/Helper';

@Component({
  selector: 'app-whislist',
  templateUrl: './whislist.page.html',
  styleUrls: ['./whislist.page.scss'],
})
export class WhislistPage implements OnInit {
  products: any[] = [];
  hasil: any[] = [];
  searchTerm:any="";

  constructor(private cartService: CartService, private router: Router,private util:Helper) {
    this.products = cartService.getCart('cart');
    console.log('Total atas : ', this.products);
  }

  ngOnInit() {
  }

  searchByName(searchTerm: any) {
    this.hasil = this.products.filter((product: any) => product.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    console.log(this.hasil);
  }
}
