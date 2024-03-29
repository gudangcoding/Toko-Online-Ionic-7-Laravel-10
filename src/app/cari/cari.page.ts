import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { RestApi } from 'src/provider/RestApi';

@Component({
  selector: 'app-cari',
  templateUrl: './cari.page.html',
  styleUrls: ['./cari.page.scss'],
})
export class CariPage implements OnInit {
  apiUrl = 'https://dummyjson.com/products';
  products: any = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';

  constructor(
    private http: HttpClient,
    private router:Router, 
    private route: ActivatedRoute,
    private api: RestApi,
    ) {
    this.route.queryParams.subscribe((params: any) => {
      this.searchTerm = params.cari;
      console.log(this.searchTerm);
    });
  }

  ngOnInit() {
    this.applySearchFilter();
  }

  onSearchChange(event: any) {
    this.api
      .get('barang/cari?q=' + event)
      .subscribe((res: any) => {
        console.log(res.products);
        this.products = res.data;
      });
  }

  detail(id:any) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id,
      },
    };
    this.router.navigate(['/detail-produk'], navigationExtras);

  }

  fetchProducts() {
    this.http.get(this.apiUrl).subscribe(
      (data: any) => {
        // this.products = data.products;
        // this.filteredProducts = this.products;
        console.log(this.products);
        if (this.searchTerm.trim() === '') {
          console.log('keyword kosong');
          this.products = data.products;
          this.filteredProducts = this.products;
          // return this.products; // Tampilkan semua produk jika tidak ada kata kunci pencarian
        } else {
          console.log('tampil semua data');
          this.products.filter((product: any) =>
            product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
        }
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );
  }

  // filterProducts() {
  //   this.filteredProducts = this.products.filter((product:any) =>
  //     product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  // }

  applySearchFilter() {
    if (this.searchTerm.trim() === '') {
      console.log('keyword kosong');
      return this.products; // Tampilkan semua produk jika tidak ada kata kunci pencarian
    } else {
      console.log('tampil semua data');
      return this.products.filter((product: any) =>
        product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  filterProducts() {
    this.fetchProducts();
    // console.log('tes');
  }
}
