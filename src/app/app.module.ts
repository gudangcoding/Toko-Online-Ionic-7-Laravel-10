import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RestApi } from 'src/provider/RestApi';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StorageService } from './services/storage.service';
import { CartService } from './services/cart.service';

@NgModule({
  declarations: [AppComponent],
 
  imports: [ HttpClientModule,BrowserModule, IonicModule.forRoot(),IonicStorageModule.forRoot(), AppRoutingModule],
  providers: [RestApi,StorageService,CartService,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
