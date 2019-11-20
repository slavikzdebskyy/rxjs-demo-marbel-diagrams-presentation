import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rxjs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public slideNumber: number;

  constructor(private router: Router) {
    this.slideNumber = 1;
  }

 public toSlaide(num: number): void {
   if (this.slideNumber + num < 1) {
     return;
   }
   this.slideNumber += num;
   this.router.navigate([`slide/${this.slideNumber}`]);
  }

}
