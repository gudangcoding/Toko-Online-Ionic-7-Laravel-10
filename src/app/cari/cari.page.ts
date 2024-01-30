import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cari',
  templateUrl: './cari.page.html',
  styleUrls: ['./cari.page.scss'],
})
export class CariPage implements OnInit {

  apiUrl = 'https://dummyjson.com/products';
  searchTerm: string = '';
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(private http:HttpClient) {}

  ngOnInit() {
    // this.fetchProducts();
    
  }
  onSearchChange(event: any) {}

  fetchProducts() {
    this.http.get<any[]>(this.apiUrl).subscribe((res:any)=>{
      console.log(res.products);
      
        this.products = res.products;
        this.filteredProducts = this.products;
    });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter((product:any) =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
