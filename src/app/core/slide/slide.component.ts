import { Component, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarbleDiagramsComponent } from 'src/app/shared/marble-diagrams/marble-diagrams.component';

import { pluck, map, filter, distinctUntilChanged, take, mergeMap, switchMap } from 'rxjs/operators';
import { Subscription, timer, interval, Observable, merge, combineLatest, from, of } from 'rxjs';

import { CODE_CONTEXT } from '../constants/code-context';
import { COLORS } from '../constants/other';
import { HelperService } from './../../services/helper.service';

@Component({
  selector: 'rxjs-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
})
export class SlideComponent implements OnDestroy {

  @ViewChild('diagramComp', {static: false})
  public diagramComp: MarbleDiagramsComponent;

  public isShowSlideHeader: boolean;
  public hidden: boolean;
  public isShowBtn: boolean;
  public slideNumber: string;
  public sliderHeader: string;
  public content: {[key: string]: string}; // code snippets
  public streamFirst: Observable<any>;
  public streamSecond: Observable<any>;
  public streamThird: Observable<any>;

  private subs: Subscription;

  constructor(
    private route: ActivatedRoute,
    private helperService: HelperService
  ) {
    this.subs = new Subscription();
    this.isShowBtn = false;
    this.hidden = true;
    this.content = CODE_CONTEXT;

    this.routeListener();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public startDemo(): void {
    this.hidden = false;
    this.diagramComp.startDemo();
  }

  private routeListener() {
    this.subs.add(
      this.route.params
      .pipe(
        pluck('number'),
        distinctUntilChanged(),
      )
      .subscribe((slideNum: string) => {
        this.slideNumber = slideNum;
        this.sliderHeader = this.helperService.getTitle(slideNum);
        this.isShowBtn = this.helperService.isShowBtn(slideNum);
        this.isShowSlideHeader = this.helperService.isShowSlideHeader(slideNum);
        this.initStreams();
      })
    );
  }

  private initStreams(): void {

    if (this.slideNumber === '20') {
      this.streamFirst = new Observable<any>(observer => {
        observer.next(1);
        setTimeout(() => observer.next(2), 1000);
        setTimeout(() => observer.next(3), 2000);
        setTimeout(() => observer.next(4), 3000);
        setTimeout(() => observer.complete(), 4000);
      });
    }

    if (this.slideNumber === '38') {
      this.streamFirst = interval(1000)
      .pipe(
        take(8),
      );

      this.streamSecond = interval(1000)
      .pipe(
        take(8),
        filter(() => Math.random() < 0.3),
      );
    }


    if (this.slideNumber === '41') {
      this.streamFirst = timer(0, 1700)
        .pipe(
          take(5),
        );

      this.streamSecond = timer(700, 1700)
        .pipe(
          map(i => 'abcdfghi'[i]),
          take(7),
        );

      this.streamThird = merge(this.streamFirst, this.streamSecond);
    }

    if (this.slideNumber === '42') {
      this.streamFirst = timer(0, 1700)
        .pipe(
          take(5),
        );

      this.streamSecond = timer(700, 1700)
        .pipe(
          map(i => 'abcdfghi'[i]),
          take(7),
        );

      this.streamThird = combineLatest(this.streamFirst, this.streamSecond)
      .pipe(map(el => el.join('-')));
    }

    if (this.slideNumber === '43') {
      this.streamFirst = timer(0, 1500)
        .pipe(
          take(4),
          map(i => 'abcd'[i]),
        );

      this.streamSecond = timer(0, 1500)
        .pipe(
          take(4),
          map(i => 'abcd'[i]),
          mergeMap(symbol => timer(0, 900).pipe(
            take(6),
            map(num => `${symbol} ${num}`),
          )),
        );
    }

    if (this.slideNumber === '44') {
      this.streamFirst = timer(0, 1500)
        .pipe(
          take(4),
          map(i => 'abcd'[i]),
        );

      this.streamSecond = timer(0, 1500)
        .pipe(
          take(4),
          map(i => 'abcd'[i]),
          switchMap(symbol => timer(0, 900).pipe(
            take(6),
            map(num => `${symbol} ${num}`),
          )),
        );
    }

    if (this.slideNumber === '45') {
      const getPromise = val => new Promise((resolve) => {
        setTimeout(() => {
          resolve(val);
        }, 3500);
      });

      this.streamFirst = from(getPromise('res'));

    }

    if (this.slideNumber === '46') {
      const getPromise = val => new Promise((resolve) => {
        setTimeout(() => resolve(val), 1500);
      });

      this.streamFirst = new Observable<any>(observer => {
        observer.next(1);
        setTimeout(() => observer.next(2), 2000);
        setTimeout(() => observer.next(3), 3000);
        setTimeout(() => observer.complete(), 4000);
      });

      this.streamSecond = this.streamFirst.pipe(
        switchMap(val => getPromise(val)),
      );

    }

    if (this.slideNumber === '') {

    }
    if (this.slideNumber === '') {

    }
    if (this.slideNumber === '') {

    }

  }


}
