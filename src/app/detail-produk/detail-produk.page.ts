import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-detail-produk',
  templateUrl: './detail-produk.page.html',
  styleUrls: ['./detail-produk.page.scss'],
})
export class DetailProdukPage implements OnInit {

  constructor( private animatioCntrl: AnimationController,) { }

  ngOnInit() {
  }
  segmentChanged(e: any) {
    // this.activeVariation = e.detail.value;

    // if (this.activeVariation == 'color') {
    //   this.animatioCntrl.create()
    //   .addElement(document.querySelector('.sizes'))
    //   .duration(500)
    //   .iterations(1)
    //   .fromTo('transform', 'translateX(0px)', 'translateX(100%)')
    //   .fromTo('opacity', '1', '0.2')
    //   .play();

    //   this.animatioCntrl.create()
    //   .addElement(document.querySelector('.colors'))
    //   .duration(500)
    //   .iterations(1)
    //   .fromTo('transform', 'translateX(-100%)', 'translateX(0)')
    //   .fromTo('opacity', '0.2', '1')
    //   .play();
    // } else {
    //   this.animatioCntrl.create()
    //   .addElement(document.querySelector('.sizes'))
    //   .duration(500)
    //   .iterations(1)
    //   .fromTo('transform', 'translateX(100%)', 'translateX(0)')
    //   .fromTo('opacity', '0.2', '1')
    //   .play();

    //   this.animatioCntrl.create()
    //   .addElement(document.querySelector('.colors'))
    //   .duration(500)
    //   .iterations(1)
    //   .fromTo('transform', 'translateX(0px)', 'translateX(-100%)')
    //   .fromTo('opacity', '1', '0.2')
    //   .play();
    // }
  }

  changeSize(size: number) {
    // this.selectedSize = size;
  }

  changeColor(color: number) {
    // this.selectedColor = color;
  }

}
