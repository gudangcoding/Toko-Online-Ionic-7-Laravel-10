import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Helper } from 'src/provider/Helper';
import { RestApi } from 'src/provider/RestApi';

@Component({
  selector: 'app-beranda',
  templateUrl: './beranda.page.html',
  styleUrls: ['./beranda.page.scss'],
})
export class BerandaPage implements OnInit {
  searchTerm: string = '';
  filteredProducts: any[] = [];
  
  products: any[] = [];
  displayedProducts: any[] = [];
  itemsPerPage: number = 10;
  currentPage: number = 1;
  response:any=[];

  constructor(
    private api: RestApi,
    private http: HttpClient,
    private router: Router,
    private util : Helper
  ) {
    // this.loadData(null);
    this.loadMoreData();
  }

  ngOnInit() {}

  private apiUrl = 'https://dummyjson.com/products';
  getProduct(page: number) {
    let hasil = this.apiUrl + '?page=' + page;
    // console.log(hasil);
    return this.http.get(`${this.apiUrl}?page=${page}`);
  }

  loadData(event: any) {
    this.util.showLoading();
    // console.log('Hasil Event : ',event);
    this.getProduct(this.currentPage).subscribe((res: any) => {
      this.util.dismissLoading();
      this.products = this.products.concat(res.products);
      console.log('event ',event);
      
      if (event) {
        event.target.complete();
      }
      this.currentPage++;

      if (res.page === res.total) {
        if (event) {
          event.target.disabled = true;
        }
      }
    });
  }

  async loadMoreData(event?: any) {
    const apiUrl = 'https://dummyjson.com/products';
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    try {
      // this.response = await this.http.get<any[]>(apiUrl).toPromise();
      this.http.get(apiUrl).subscribe((res:any)=>{
        this.response = res.products;
        this.products = this.response.slice(startIndex, endIndex);
        this.displayedProducts = [...this.displayedProducts, ...this.products];
      });
     

      if (event) {
        event.target.complete();
      }

      this.currentPage++;
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  }
  
  toSerach(cari:any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        cari: cari,
      },
    };
    this.router.navigate(['/cari'], navigationExtras);
   
  }

  detail(id:any) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id,
      },
    };
    this.router.navigate(['/detail-produk'], navigationExtras);

  }
}
