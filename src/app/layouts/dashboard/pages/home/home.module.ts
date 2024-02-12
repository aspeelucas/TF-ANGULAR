import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {MatButtonModule} from '@angular/material/button';
import { SharedModule } from '../../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';




@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    SharedModule,
    // RouterModule,
    HomeRoutingModule
    
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
