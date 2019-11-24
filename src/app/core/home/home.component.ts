import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { pluck, distinctUntilChanged, take, filter, tap, map } from 'rxjs/operators';

@Component({
  selector: 'rxjs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  public slideNumber: number;

  private subs: Subscription;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {
    this.subs = new Subscription();
    this.slideNumber = 1;

    this.subs.add(
      this.router.events
        .pipe(
          pluck('url'),
          filter(Boolean),
          map((url: string) => url.split('/').reverse()[0]),
          map((param: string) => parseInt(param, 10)),
          take(1),
        )
      .subscribe((param: number) => this.slideNumber = param)
    );
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

 public toSlaide(num: number): void {
   if (this.slideNumber + num < 1) {
     return;
   }
   this.slideNumber += num;
   this.router.navigate([`slide/${this.slideNumber}`]);
  }

}
