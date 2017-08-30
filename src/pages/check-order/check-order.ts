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
//trás os dados de outra view e armazena em variaveis do tipo string
var_desk_name: string = this.navParams.get('desk_name');
var_desk_items: string = this.navParams.get('items');
var_total_geral: string = this.navParams.get('total_geral');
private enderecoApi: string = "http://192.168.0.37:3000/";
public item_id;
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

  //verifica se realmente  quer deletar o item
    close_desk_order(t){
      this.item_id = console.log(t);
      let alert = this.alertCtrl.create({
        title: 'Confirmar',
        message: 'Deseja realmente fechar a sua conta?',
        buttons: [{
          text: "Sim",
          handler: () => { this.confirm_close_desk_order() }
        }, {
          text: "Cancelar",
          role: 'cancel'
        }]
      })
      alert.present();
  }

    //confirma o fechamento da mesa
    confirm_close_desk_order() {
      this.nativeStorage.getItem('current_session').then
          ((dados_mesa_aberta) =>
          {
           if (dados_mesa_aberta)
             {
               let headers = new Headers({ 'Content-Type' : 'application/json'});
               let options = new RequestOptions({ headers: headers });
               //here we send the data to API
               let data = JSON.stringify({
               cardToken: 'G0d1$@Bl3T0d0W4Th3V3Rth1Ng',
               desk_order_id: dados_mesa_aberta.id_da_mesa,
               });

               return new Promise((resolve, reject) => {
                 this.http.post(this.enderecoApi + 'close_order', data, options)
                 .toPromise()
                 .then((response) => {
                   const retorno_da_API = response.json();
                   const alert = this.alertCtrl.create({
                   subTitle: 'Sua solicitação já foi enviada, aguarde o nosso atendente trazer a sua conta, obrigado!',
                   buttons: ['OK'],
                   });
                   alert.present();

                   this.nativeStorage.clear();
                   this.app.getRootNav().setRoot('HomePage');

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
              const alert = this.alertCtrl.create({
              subTitle: 'Acho que aconteceu algo de errado, por favor informe um de nossos atendentes.',
              buttons: ['OK'],
              });
              alert.present();
            }
          }), error => {
            console.error('Ocorreu um erro : ', error.status);
          };
    }

        //verifica se realmente  quer deletar o item
        delete_item(t){
          this.item_id = console.log(t);
          let alert = this.alertCtrl.create({
            title: 'Confirmar',
            message: 'Deseja excluir este item?',
            buttons: [{
              text: "Excluir",
              handler: () => { this.confirm_delete_item(t) }
            }, {
              text: "Cancelar",
              role: 'cancel'
            }]
          })
          alert.present();
  }
        //confirmada a exclusão do item
        confirm_delete_item(t) {
          this.nativeStorage.getItem('current_session').then
              ((dados_mesa_aberta) =>
              {
               if (dados_mesa_aberta)
                 {
                   let headers = new Headers({ 'Content-Type' : 'application/json'});
                   let options = new RequestOptions({ headers: headers });
                   //here we send the data to API
                   let data = JSON.stringify({
                   cardToken: 'G0d1$@Bl3T0d0W4Th3V3Rth1Ng',
                   desk_order_id: dados_mesa_aberta.id_da_mesa,
                   item_id_app: t,
                   });

                   return new Promise((resolve, reject) => {
                     this.http.post(this.enderecoApi + 'delete_item', data, options)
                     .toPromise()
                     .then((response) => {
                       const retorno_da_API = response.json();
                       const alert = this.alertCtrl.create({
                       subTitle: retorno_da_API.resultado_API,
                       buttons: ['OK'],
                       });
                       alert.present();
                         this.navCtrl.push('MenuPage')

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
                  const alert = this.alertCtrl.create({
                  subTitle: 'Acho que aconteceu algo de errado, por favor informe um de nossos atendentes.',
                  buttons: ['OK'],
                  });
                  alert.present();
                }
              }), error => {
                console.error('Ocorreu um erro : ', error.status);
              };
        }
}
