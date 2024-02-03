import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Helper } from 'src/provider/Helper';
import { RestApi } from 'src/provider/RestApi';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  name:any;
  email:any;
  password:any;
  c_password:any;

  constructor(
    private router: Router,
    private api : RestApi,
    private util : Helper
  ) { }

  ngOnInit() {
  }

  daftar(){
    let body = {
      name:this.name,
      email : this.email,
      password:this.password,
      c_password:this.c_password,
    }
    this.api.post(body,'user/register').subscribe((res:any)=>{
      console.log(res);
      
        if(res.success==true){
          this.router.navigate(['/login']);
        }else{
          this.util.alertNotif('Register Gagal, Server Error');
        }
    });
  }
  
}
