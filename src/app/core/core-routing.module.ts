import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

  //  Components
import { HomeComponent } from './home/home.component';
import { SlideComponent } from './slide/slide.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: '/slide/1',
        pathMatch: 'full',
      },
      {
        path: 'slide/:number',
        component: SlideComponent,
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class CoreRoutingModule { }
