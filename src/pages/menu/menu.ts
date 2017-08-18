import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
      public alertCtrl: AlertController,
    public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
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
