import { Component } from '@angular/core';
import { Helper } from 'src/provider/Helper';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  
})

export class AppComponent {
  constructor(private util:Helper) {
    this.cekLogin();
  }

  cekLogin(){
    // this.sesi.get('member').then((res:any)=>{
    //   console.log(res);
    let session=localStorage.getItem('member');
      if(session == null){
        this.util.Navigasi('/login');
      }else{
        this.util.NavigasiUrl('/home/beranda');
      }
    // });
  }
}
