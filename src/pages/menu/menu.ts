import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController, NavParams,  App } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  //o titulo usado na view
  title = 'Categorias';
  private categories_api: any;
  responseData : any;
  products : any;
  //envia o id da categoria para a API para trazer os produtos da catagoria
  public id_category;
  public name_category;

  public enderecoApi: string = "http://192.168.0.37:3000/";
  public all_categories: any; // <- esta variavel é a responsável em levar os dados para a view
  public id_categoria: string;
  public nome_categoria: string;
  public produtos_categoria: any;
  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public alertCtrl: AlertController,
     public http: Http,
     private loadingCtrl: LoadingController,
     public app: App) {

      let loadingPopup = this.loadingCtrl.create({
        content: 'Loading...'
      });
      this.http.get(this.enderecoApi + '/list_categories').subscribe(data => { this.categories_api = data.json().categories_product;
        console.log('RETORNO DO GET : ', data.json().categories_product);
      this.initializeItems();
      // Hide the loading message
      loadingPopup.dismiss();
          });
  }

  initializeItems() {
      this.all_categories = this.categories_api;
    }

    getItems(ev: any) {
        // Reset items back to all of the items
        this.initializeItems();

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
          this.all_categories = this.all_categories.filter((t) => {
            return (t.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
      }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  //TRÁS TODOS OS PRODUTOS DA CATEGORIA SELECIONADA
  chama_produtos(data:any) {
     //aproveita o nome da categoria e manda para view que exibira os produto
     this.id_category = data.category_id;
     this.name_category = data.category_name;
     this.navCtrl.push('AllProductsPage',{id_categoria: data.category_id, nome_categoria: data.category_name});
  }




  teste (data:any){

    this.id_category = data.category_id;
    this.name_category = data.category_name;

    let headers = new Headers(
    {
      'Content-Type' : 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    //here we send the data to API
    let dados = JSON.stringify({
      cardToken: 'G0d1$@Bl3T0d0W4Th3V3Rth1Ng',
      id_da_categoria: data.category_id
    });
    //aqui é feito o post enviando os parametros para a API
    return new Promise((resolve, reject) => {
      this.http.post(this.enderecoApi + '/list_products', dados, options)
      .toPromise()
      //aqui o retorno da API é carregado em Json em um array
      .then((response) => {
        const retorno_da_API = response.json();
        this.products = response.json();
        //store session data and redirect to specific app view
        //localStorage.setItem('userData', JSON.stringify(this.responseData));
        //const page = (retorno_da_API.error) ? 'HomePage' : 'MenuPage';
        //this.navCtrl.push(page);
        this.navCtrl.push('AllProductsPage',{id_categoria: data.category_id, nome_categoria: data.category_name, produtos_categoria: this.products});
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









  // para finalizar o aplicativo e remover a tab inferior
  backToWelcome() {
    // mensagem no login
    const alert = this.alertCtrl.create({
      subTitle: 'See you soon!',
      buttons: ['OK'],
    });
    alert.present();
    this.app.getRootNav().setRoot('HomePage');
  }

  // finaliza o aplicativo depois de 1 segundo
  logout() {
    localStorage.clear();
    setTimeout(() => this.backToWelcome(), 1000);
  }

}
