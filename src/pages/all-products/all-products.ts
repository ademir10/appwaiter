import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams,  App } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
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
  private enderecoApi: string = "http://192.168.0.37:3000/";

  public all_products: any;
  public id_aberto: any;
  public id_produto: any;
  public currentNumber = 0;
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

   private increment () {
     this.currentNumber++;
   }

   private decrement () {
     this.currentNumber--;
   }

   initializeItems() {
       this.all_products = this.var_products;
     }

 add_product(data:any) {
   //pega o id do produto selecionado na view
   this.id_produto = data.id_produto
   this.nativeStorage.getItem('current_session').then
       ((dados_mesa_aberta) =>
       {
        if (data)
          {
            let headers = new Headers({ 'Content-Type' : 'application/json'});
            let options = new RequestOptions({ headers: headers });
            //here we send the data to API
            let data = JSON.stringify({
            cardToken: 'G0d1$@Bl3T0d0W4Th3V3Rth1Ng',
            desk_order_id: dados_mesa_aberta.id_da_mesa,
            product_id: this.id_produto,
            qnt_product: this.currentNumber
            });

            return new Promise((resolve, reject) => {
              this.http.post(this.enderecoApi + 'add_product', data, options)
              .toPromise()
              .then((response) => {
                const retorno_da_API = response.json();

                const alert = this.alertCtrl.create({
                subTitle: retorno_da_API.produto_adicionado.name + ' adicionado!',
                buttons: ['OK'],
                });
                alert.present();


                console.log('API Response : ', response.json());
                resolve(response.json());
              })
              .catch((error) =>
              {
                console.error('API Error : ', error.status);
                console.error('API Error : ', JSON.stringify(error));
                reject(error.json());

              });
            });

         }
         else
         {
           this.nativeStorage.setItem('current_session', '');
           this.id_aberto = '';
         }
       }), error => {
         console.error('Ocorreu um erro : ', error.status);
       };
 }


}
