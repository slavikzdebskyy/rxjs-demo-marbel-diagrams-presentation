import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

  //  Modules
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

  //  Components
import { HomeComponent } from './home/home.component';
import { SlideComponent } from './slide/slide.component';


@NgModule({
  declarations: [
    HomeComponent,
    SlideComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
  ]
})
export class CoreModule { }
