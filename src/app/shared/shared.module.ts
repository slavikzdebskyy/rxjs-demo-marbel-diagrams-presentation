import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

  //  Components
import { MarbleDiagramsComponent } from './marble-diagrams/marble-diagrams.component';

const COMPONENTS = [
  MarbleDiagramsComponent,
];



@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule
  ],
  exports: [...COMPONENTS],
})
export class SharedModule { }
