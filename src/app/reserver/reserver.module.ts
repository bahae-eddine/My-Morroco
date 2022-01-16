import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReserverPageRoutingModule } from './reserver-routing.module';

import { ReserverPage } from './reserver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReserverPageRoutingModule
  ],
  declarations: [ReserverPage]
})
export class ReserverPageModule {}
