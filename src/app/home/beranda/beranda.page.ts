import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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
    private router: Router
  ) {
    this.loadData(null);
  }

  ngOnInit() {}

  private apiUrl = 'https://simple-shop.app/api/v1/barang';
  getProduct(page: number) {
    let hasil = this.apiUrl + '?page=' + page;
    // console.log(hasil);
    return this.http.get(`${this.apiUrl}?page=${page}`);
  }

  loadData(event: any) {
    // console.log('Hasil Event : ',event);
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

  toSerach() {
    this.router.navigateByUrl('cari');
  }

  // detail(id: any) {
  //   const navigationExtras: NavigationExtras = {
  //     state: {
  //       id: id,
  //     },
  //   };

  //   this.router.navigate(['/detail-produk'], navigationExtras);
  // }
  detail(id:any) {
    // this.helper.NavigasiParameter('DetailPage',id);
    // // this.router.navigate(['/detail']);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id,
      },
    };
    this.router.navigate(['/detail-produk'], navigationExtras);

  }
}
