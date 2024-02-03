import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  profilePhoto: any =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png';
  user: any = [];
  constructor() {
    this.user = localStorage.getItem('member');
    console.log(this.user);
    
  }

  ngOnInit() {}
  edit() {}
  logout() {}
}
