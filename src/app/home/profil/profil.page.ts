import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi } from 'src/provider/RestApi';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  profilePhoto =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png';
  user: any ;
  profil: any = [];

  constructor(
    private router:Router,
    private api:RestApi,
    private cartService: CartService,
    ) {
  this.user = cartService.getCart('member');
    console.log(this.user.token);
    
  }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    this.api.getWithToken('user/profil/'+this.user.id,this.user.token).subscribe((res:any)=>{
      console.log(this.user.token);
      this.profil=res.data;
    });
  }

  edit() {}

  logout() {
    localStorage.removeItem('member');
    this.router.navigateByUrl('login');
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });

    this.uploadPicture(image.dataUrl);
  }

  uploadPicture(imageData:any) {
    const postData = { image: imageData,id:this.user.id };
    this.api.post(postData,'user/uploadfoto').subscribe((res:any)=>{
    })
  }
}
