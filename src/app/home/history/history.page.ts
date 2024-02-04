import { Component, OnInit,Renderer2, AfterViewInit  } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { RestApi } from 'src/provider/RestApi';
import { Sesi } from 'src/provider/Sesi';

declare var snap:any;

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
  user:any;
  constructor(
    private cartService: CartService,
    private api:RestApi,
    private sesi:Sesi,
    private renderer: Renderer2
    ) { 
    this.user = sesi.get('member');

    this.orderStatusList = [
      { title: 'Pesanan Diterima', description: 'Pesanan Anda telah diterima.', date: '12 Januari 2024'  },
      { title: 'Sedang Diproses', description: 'Pesanan Anda sedang diproses.', date: '14 Januari 2024'},
      { title: 'Dikirim', description: 'Pesanan Anda telah dikirim.', date: '16 Januari 2024' },
    ];
  }
  
  ngOnInit() {
    this.getOrder();
  }

  ngAfterViewInit() {
    // Menambahkan elemen <script> ke dalam <head> setelah tampilan diinisialisasi
    const script = this.renderer.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', 'SB-Mid-client-MhvyXioACTyrI6-U');
    this.renderer.appendChild(document.head, script);
  }
 

  segmentChanged(event:any){
    this.selectedSegment = event.detail.value;
  }

  getOrder(){
    this.api.getWithToken('order/listpesanan/'+this.user.id,this.user.token).subscribe((res:any)=>{
      console.log(res);
      this.products=res.data.data;
    });
  }

   //url testing
  //https://simulator.sandbox.midtrans.com/
  bayar(snapToken: any) {
    console.log('Token : ',snapToken);
    
    snap.pay(snapToken, {
      onSuccess: (result: any) => {
        console.log('Pembayaran berhasil:', result);
        // Lakukan sesuatu setelah pembayaran berhasil
      },
      onPending: (result: any) => {
        console.log('Pembayaran tertunda:', result);
        // Lakukan sesuatu setelah pembayaran tertunda
      },
      onError: (result: any) => {
        console.error('Pembayaran gagal:', result);
        // Lakukan sesuatu setelah pembayaran gagal
      },
    });
  }

}
