import { Component } from '@angular/core';
  import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
//para guardar o id da mesa aberta localmente
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

//variaveis para enviar os dados para a API
public numero_mesa;
public mensagem;
responseData : any;
loading : any;
private enderecoApi: string = "http://192.168.0.37:3000/";
//private enderecoApi: string = "http://dsoft.ddns.net:37000/";
verifica_usuario: any;

  scanData : {};

  options :BarcodeScannerOptions;
  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public alertCtrl: AlertController,
  private barcodeScanner: BarcodeScanner,
  public http: Http,
  //para armazenar o id da mesa localmente
  private nativeStorage: NativeStorage) {
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

    this.send_desk_data();

    }, (err) => {
        console.log("Error occured : " + err);
    });
}

//ENVIA O NUMERO DA MESA PARA A API Rails
send_desk_data(){

  let headers = new Headers({ 'Content-Type' : 'application/json'});
  let options = new RequestOptions({ headers: headers });
  //here we send the data to API
  let data = JSON.stringify({
    cardToken: 'G0d1$@Bl3T0d0W4Th3V3Rth1Ng',
    numero_da_mesa: this.numero_mesa,
    tipo_atendimento: 'waiter'
  });

  return new Promise((resolve, reject) => {
    this.http.post(this.enderecoApi + '/check_mesa', data, options)
    .toPromise()
    .then((response) => {
      const retorno_da_API = response.json();

        //verify if QRpoint is free
        if (retorno_da_API.retorno_rails === 'A MESA ESTÁ LIVRE') {
          //o id da mesa é guardado localmente para ser usado na adição dos produtos
          this.nativeStorage.setItem('current_session', {id_da_mesa: retorno_da_API.id_da_mesa, tipo_atendimento: retorno_da_API.tipo_atendimento, qr_code_mesa: this.numero_mesa})
  .then(
    () => console.log('Stored session!'),
    error => console.error('Error storing session', error)
  );

        this.navCtrl.push('MenuPage')
        this.mensagem = 'Olá seja bem vindo, veja o que o cliente deseja!'
        }
        if (retorno_da_API.retorno_rails === 'A MESA ESTÁ EM USO') {
          this.nativeStorage.clear();
          this.nativeStorage.setItem('current_session', {id_da_mesa: retorno_da_API.id_da_mesa, tipo_atendimento: retorno_da_API.tipo_atendimento, qr_code_mesa: this.numero_mesa})

          this.mensagem = 'Você está no QRpoint: ' + retorno_da_API.nome_qrpoint + ', veja se está certo e adicione os pedidos do cliente.'
          this.navCtrl.push('MenuPage')
        }
        if (retorno_da_API.retorno_rails === 'CÓDIGO INVALIDO') {
          this.mensagem = 'O Código informado não existe.'
        }
        if (retorno_da_API.retorno_rails === 'AGUARDANDO O FECHAMENTO') {
          this.mensagem = 'Desculpe, este local ainda está aguardando o pagamento da conta, tente mais tarde.'
        }
        if (retorno_da_API.retorno_rails === 'ACESSO NEGADO') {
          this.mensagem = 'Acesso negado!.'
        }

        const alert = this.alertCtrl.create({
          title: 'Aviso:',
        subTitle: this.mensagem,
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

      const alert = this.alertCtrl.create({
      title: 'Falha de conexão:',
      subTitle: 'Desculpe, não conseguimos encontrar o servidor, avise o suporte.',
      buttons: ['OK'],
      });
      alert.present();

    });
  });
}

}
