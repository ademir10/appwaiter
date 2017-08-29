import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckOrderPage } from './check-order';

@NgModule({
  declarations: [
    CheckOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckOrderPage),
  ],
})
export class CheckOrderPageModule {}
