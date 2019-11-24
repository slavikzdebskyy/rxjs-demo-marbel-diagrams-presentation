import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

  //  Modules
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { NgxMdModule } from 'ngx-md';

  //  Components
import { HomeComponent } from './home/home.component';
import { SlideComponent } from './slide/slide.component';

  //  Services
import { HelperService } from '../services/helper.service';

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
    HttpClientModule,
    MatDividerModule,
    NgxMdModule.forRoot(),
  ],
  providers: [
    HelperService,
  ]
})
export class CoreModule { }
