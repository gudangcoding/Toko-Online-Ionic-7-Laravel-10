import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi } from 'src/provider/RestApi';

@Component({
  selector: 'app-beranda',
  templateUrl: './beranda.page.html',
  styleUrls: ['./beranda.page.scss'],
})
export class BerandaPage implements OnInit {
 
 
  searchTerm: string = '';
  products: any[] = [];
  filteredProducts: any[] = [];
  currentPage: number = 1;

  constructor(
    private api: RestApi,
    private http: HttpClient,
    private route:Router
    ) {
    this.loadData(null);
  }

  ngOnInit() {
    
  }
 


  applySearchFilter() {
    if (this.searchTerm.trim() === '') {
      return this.products; // Tampilkan semua produk jika tidak ada kata kunci pencarian
    } else {
      return this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  

  private apiUrl = 'https://simple-shop.app/api/v1/barang';
  getProduct(page: number) {
    
    let hasil = this.apiUrl+"?page="+page;
    // console.log(hasil);
    return this.http.get(`${this.apiUrl}?page=${page}`);
  }

  loadData(event:any) {
    console.log('Hasil Event : ',event);
    this.getProduct(this.currentPage).subscribe((res: any) => {
      this.products = this.products.concat(res.data.data);
      if (event) {
        event.target.complete();
      }
      this.currentPage++;

      if (res.page === res.total_pages) {
        if (event) {
          event.target.disabled = true;
        }
      }
    });
  }
  toSerach(){
    this.route.navigateByUrl('cari');
  }
  
}
