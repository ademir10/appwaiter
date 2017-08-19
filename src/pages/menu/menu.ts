import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController, NavParams, App } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  //o titulo usado na view
  title = 'Nosso Cardápio';
  private categories_api: any;
  private dados_usuario: any;
  responseData : any;
  userData = { name: '', email: '',merda: '' };
  private enderecoApi: string = "http://192.168.0.37:3000/";
  //para fazer o search
  private searchQuery: string = '';
  private all_categories: any; // <- esta variavel é a responsável em levar os dados para a view

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

  //listando todas as categorias dos produtos






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
