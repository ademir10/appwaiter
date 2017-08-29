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
  selector: 'page-check-order',
  templateUrl: 'check-order.html',
})
export class CheckOrderPage {
var_desk_name: string = this.navParams.get('desk_name');
var_desk_items: string = this.navParams.get('items');
var_total_geral: string = this.navParams.get('total_geral');
  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public alertCtrl: AlertController,
     public http: Http,
     public app: App,
     //para armazenar o id da mesa localmente
     private nativeStorage: NativeStorage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckOrderPage');
  }

}
