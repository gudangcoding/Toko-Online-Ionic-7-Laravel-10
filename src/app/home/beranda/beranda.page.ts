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
  products: any[] = [];
  filteredProducts: any[] = [];
  currentPage: number = 1;

  constructor(
    private api: RestApi,
    private http: HttpClient,
    private router: Router,
    private util : Helper
  ) {
    this.loadData(null);
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
