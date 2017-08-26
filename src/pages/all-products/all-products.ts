import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams,  App } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
//para guardar o id da mesa aberta localmente
import { NativeStorage } from '@ionic-native/native-storage';

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
  public enderecoApi: string = "http://192.168.0.37:3000/";
  public all_products: any;
  public id_aberto: any;
  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public alertCtrl: AlertController,
     public http: Http,
     public app: App,
     //para armazenar o id da mesa localmente
     private nativeStorage: NativeStorage) {
      console.log('AO CARREGAR A VIEW : ', this.var_products);
      this.initializeItems();
   }

   initializeItems() {
       this.all_products = this.var_products;
     }

 add_product() {
   this.id_aberto = this.nativeStorage.getItem('myitem')
   this.nativeStorage.getItem('myitem')
  .then(
    data => console.log(data),
    error => console.error(error)
  );

   const alert = this.alertCtrl.create({
     subTitle: this.id_aberto.id_da_mesa,
     buttons: ['OK'],
   });
   alert.present();
 }


}
