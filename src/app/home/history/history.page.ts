import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  selectedSegment: string = 'proses';
  products: any = [];
  product: any = [];
  orderStatusList: any[] = [];
  constructor(private cartservice: CartService) { 
    this.products = localStorage.getItem('cart');

    this.orderStatusList = [
      { title: 'Pesanan Diterima', description: 'Pesanan Anda telah diterima.', date: '12 Januari 2024'  },
      { title: 'Sedang Diproses', description: 'Pesanan Anda sedang diproses.', date: '14 Januari 2024'},
      { title: 'Dikirim', description: 'Pesanan Anda telah dikirim.', date: '16 Januari 2024' },
    ];
  }
  
  ngOnInit() {
  }

 

  segmentChanged(event:any){
    this.selectedSegment = event.detail.value;
  }

}
