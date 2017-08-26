import { BrowserModule } from '@angular/platform-browser';
// IMPORTADO PARA O RACK CORS
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
//PARA GUARDAR O ID DA MESA LOCALMENTE NO aplicativo
import { NativeStorage } from '@ionic-native/native-storage';
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
    IonicModule.forRoot(MyApp, { backButtonText: 'Voltar'} ),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

  ],
  providers: [
    NativeStorage,
    StatusBar,
    SplashScreen,
     BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
