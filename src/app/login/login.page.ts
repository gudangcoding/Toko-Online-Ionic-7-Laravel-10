import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Helper } from 'src/provider/Helper';
import { RestApi } from 'src/provider/RestApi';
import { Sesi } from 'src/provider/Sesi';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
email:any;
password:any;
  constructor(
    private router:Router,
    private util:Helper,
    private api : RestApi, 
    private sesi : Sesi
    ) { }

  ngOnInit() {
  }

  cekLogin() {
    let body = {
      email: this.email,
      password: this.password,
    };
    this.api.post(body, 'user/login').subscribe((res: any) => {
      console.log('Hasil ', res);
      this.sesi.set('member',res.data);
    
      if (res.success == true) {
        this.router.navigate(['/beranda/home'],{replaceUrl:true});
      } else {
        this.util.alertNotif('Login Gagal, Cek Email dan Password');
      }

    });
  }

}
