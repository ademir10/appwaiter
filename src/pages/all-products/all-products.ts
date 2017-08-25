import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams,  App } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@IonicPage()
@Component({
  selector: 'page-all-products',
  templateUrl: 'all-products.html',
})
export class AllProductsPage {
  //o titulo usado na view
  responseData : any;
  //pega o nome da categoria que está vindo da outra view
  var_category_id: string = this.navParams.get('id_categoria');
  var_category_name: string = this.navParams.get('nome_categoria');
  var_products: string = this.navParams.get('produtos_categoria');
  public enderecoApi: string = "http://localhost:3000/";
  public all_products: any;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public alertCtrl: AlertController,
     public http: Http,
     public app: App) {
      console.log('AO CARREGAR A VIEW : ', this.var_products);
      this.initializeItems();
   }

   initializeItems() {
       this.all_products = this.var_products;
     }

 add_product() {
   const alert = this.alertCtrl.create({
     subTitle: 'Chegou na function Glória a Deus!',
     buttons: ['OK'],
   });
   alert.present();
 }


}
