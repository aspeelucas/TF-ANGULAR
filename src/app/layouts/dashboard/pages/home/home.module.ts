import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, MatButtonModule, SharedModule, HomeRoutingModule],
  exports: [HomeComponent],
})
export class HomeModule {}
