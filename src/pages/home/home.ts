import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
//variaveis para enviar os dados para a API
public numero_mesa;
responseData : any;
mesaData = { numero_mesa: '' };
private enderecoApi: string = "http://192.168.0.37:3000/";
verifica_usuario: any;

  scanData : {};

  options :BarcodeScannerOptions;
  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public alertCtrl: AlertController,
  private barcodeScanner: BarcodeScanner,
  public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  //FAZ A LEITURA DO CODIGO DE BARRAS / QR CODE
  scan(){
    this.options = {
        prompt : "Scan your barcode "
    }
    this.barcodeScanner.scan(this.options).then((barcodeData) => {
    console.log(barcodeData);
    this.scanData = barcodeData;
    this.numero_mesa = barcodeData.text;

    //const alert = this.alertCtrl.create({
    //  subTitle: 'Esse é o numero da mesa vindo no scan: ' + this.numero_mesa,
    //  buttons: ['OK'],
    //});
    //alert.present();

    this.send_desk_data();

    }, (err) => {
        console.log("Error occured : " + err);
    });
}

//ENVIA O NUMERO DA MESA PARA A API Rails
send_desk_data(){

  let headers = new Headers(
  {
    'Content-Type' : 'application/json'
  });
  let options = new RequestOptions({ headers: headers });

  let data = JSON.stringify({
    cardToken: 'Deus até o fim',
    numero_da_mesa: this.numero_mesa
  });

  return new Promise((resolve, reject) => {
    this.http.post(this.enderecoApi + '/check_mesa', data, options)
    .toPromise()
    .then((response) =>
    {
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

//CHAMA O MENU DEPOIS DE AUTENTICADO
chama_menu() {
  // mensagem no login
  const alert = this.alertCtrl.create({
    subTitle: 'Chamou a view menu!',
    buttons: ['OK'],
  });
  alert.present();
  this.navCtrl.push('MenuPage')
}


}
