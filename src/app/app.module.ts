import { BrowserModule } from '@angular/platform-browser';
// IMPORTADO PARA O RACK CORS
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,

  ],
  imports: [
    BrowserModule,
    // IMPORTADO PARA O RACK CORS
    HttpModule,
    //aqui eu altero os dizeres do botão voltar
    IonicModule.forRoot(MyApp, { backButtonText: 'Voltar'} )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

  ],
  providers: [
    StatusBar,
    SplashScreen,
     BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
