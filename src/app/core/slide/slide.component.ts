import { Component, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarbleDiagramsComponent } from 'src/app/shared/marble-diagrams/marble-diagrams.component';

import { pluck, map, filter, distinctUntilChanged,
  take, mergeMap, switchMap, debounceTime, tap, skipWhile } from 'rxjs/operators';
import { Subscription, timer, interval, Observable,
  merge, combineLatest, from, fromEvent, Subject, BehaviorSubject, forkJoin, concat } from 'rxjs';

import { CODE_CONTEXT } from '../constants/code-context';
import { HelperService } from './../../services/helper.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'rxjs-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
})
export class SlideComponent implements OnDestroy {

  @ViewChild('diagramComp', {static: false})
  public diagramComp: MarbleDiagramsComponent;

  @ViewChild('input', {static: false})
  public input: ElementRef;

  public isShowSlideHeader: boolean;
  public hidden: boolean; // is marbel diagram hidden
  public isShowBtn: boolean;
  public slideNumber: string;
  public sliderHeader: string;
  public content: {[key: string]: string}; // code snippets
  public streamFirst: Observable<any>;
  public streamSecond: Observable<any>;
  public streamThird: Observable<any>;
  public inputValues: any[];
  public consoleLogVal: string;

  private subject: Subject<any>;
  private subs: Subscription;

  constructor(
    private route: ActivatedRoute,
    private helperService: HelperService,
    private http: HttpClient,
  ) {
    this.subs = new Subscription();
    this.isShowBtn = false;
    this.hidden = true;
    this.content = CODE_CONTEXT;
    this.inputValues = [];
    this.subject = new Subject();

    this.routeListener();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public startDemo(): void {
    this.hidden = false;

    if (this.slideNumber === '59') {
      this.diagramComp.startSubjectDemo();
      return;
    }

    this.prepareDemo();
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

    this.streamFirst = null;
    this.streamSecond = null;
    this.streamThird = null;
    this.hidden = true;

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

    if (this.slideNumber === '46') {
      const getPromise = (val, t) => new Promise((resolve) => {
        setTimeout(() => {
          resolve(val);
        }, t);
      });

      this.streamFirst = from(getPromise('🤡', 3000));

    }

    if (this.slideNumber === '48') {
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

    if (this.slideNumber === '49') {
      this.inputValues = [];

      setTimeout(() => {
        fromEvent(this.input.nativeElement, 'input')
        .pipe(
          pluck('target', 'value'),
        )
        .subscribe((value: string) => {
          this.inputValues.push(value);
        });
      }, 3000);
    }

    if (this.slideNumber === '50') {
      this.inputValues = [];

      setTimeout(() => {
        fromEvent(this.input.nativeElement, 'input')
        .pipe(
          pluck('target', 'value'),
          debounceTime(500),
        )
        .subscribe((value: string) => {
          this.inputValues.push(value);
        });
      }, 3000);
    }

    if (this.slideNumber === '51') {
      this.inputValues = [];

      setTimeout(() => {
        fromEvent(this.input.nativeElement, 'input')
        .pipe(
          pluck('target', 'value'),
          debounceTime(500),
          distinctUntilChanged(),
        )
        .subscribe((value: string) => {
          this.inputValues.push(value);
        });
      }, 3000);
    }

    if (this.slideNumber === '52') {
      this.inputValues = [];

      setTimeout(() => {
        fromEvent(this.input.nativeElement, 'input')
        .pipe(
          pluck('target', 'value'),
          debounceTime(500),
          distinctUntilChanged(),
          switchMap(value => this.http.get(`http://dummy.restapiexample.com/api/v1/employee/${value}`)),
        )
        .subscribe( value => {
          this.inputValues.push(value);
        });
      }, 3000);
    }

    const random = () => Math.floor(Math.random() * 100);

    if (this.slideNumber === '57') {
      this.streamFirst = timer(0, 1000)
        .pipe(
          take(7),
          map(() => random()),
        );

      this.streamSecond = timer(0, 1000)
      .pipe(
        take(7),
        map(() => random()),
      );

      this.streamThird = timer(1500, 1000)
      .pipe(
        take(7),
        map(() => random()),
      );
    }

    if (this.slideNumber === '59') {
      this.streamFirst = this.subject;
      setTimeout(() => {
        this.streamSecond = this.subject;
      }, 1200);

      setTimeout(() => {
        this.streamThird = this.subject;
      }, 2200);
    }

    if (this.slideNumber === '74' || this.slideNumber === '75') {
      this.inputValues = [];
    }

    if (this.slideNumber === '81') {
      const array = [0, null, 36, 'q', 78, 102, undefined, 's', 32, 1, '23', 49, 57];

      this.streamFirst = timer(0, 1000)
        .pipe(
          take(10),
          map(i => [0, 'null', 36, 'q', 78, 102, 'undfd', 's', 32, 1, '23', 49, 57][i]),
        );

      this.streamSecond = timer(0, 1000)
        .pipe(
          take(10),
          map(i => array[i]),
          skipWhile(num => !num),
        );

      this.streamThird = timer(0, 1000)
        .pipe(
          take(10),
          map(i => array[i]),
          filter(Boolean),
        );
    }

    if (this.slideNumber === '83') {

      const streamOne = timer(0, 800)
        .pipe(
          take(6),
          map(i => 'abcdfghijklmn'[i]),
        );

      const streamTwo = timer(0, 1200)
        .pipe(
          take(5),
        );

      this.streamFirst = forkJoin(streamOne, streamTwo);

      this.streamSecond = concat(streamOne, streamTwo);
    }

    if (this.slideNumber === '85') {

      const array = [2, 7, 12, 4, 9, 15, 70, 2, 20, 32, 1, 17, 5];

      function customFilter() {
        return stream => {
          return stream
          .pipe(
            filter(val => val > 10),
          );
        };
      }

      this.streamFirst = timer(0, 800)
        .pipe(
          take(10),
          map(i => array[i]),
        );

      this.streamSecond = timer(0, 800)
        .pipe(
          take(10),
          map(i => array[i]),
          customFilter(),
        );
    }

  }

  prepareDemo() {
    this.inputValues = [];
    const stream = this.http.get('https://jsonplaceholder.typicode.com/todos/1');

    if (this.slideNumber === '74') {
      stream.subscribe(
        res => this.inputValues.push(res),
      );

      stream.subscribe(
        res => setTimeout(() => this.inputValues.push(res), 1555),
      );
    }

    if (this.slideNumber === '75') {
      const subject = new BehaviorSubject<any>(null);

      stream
      .pipe(
        tap(value => console.log(value)),
        tap(value => subject.next(value))
      )
      .subscribe();

      subject
      .pipe(filter(Boolean))
      .subscribe(res => this.inputValues.push(res));

      setTimeout(() => {
        subject.subscribe(res => this.inputValues.push(res));
      }, 1500);

      setTimeout(() => {
        subject.subscribe(res => this.inputValues.push(res));
      }, 2500);
    }
  }

  public catchEmmit(): void {
    const random = () => Math.floor(Math.random() * 100);

    if (this.slideNumber === '59') {
      this.subject.next(random());
      setTimeout(() => this.subject.next(random()), 1000);
      setTimeout(() => this.subject.next(random()), 2000);
      setTimeout(() => this.subject.next(random()), 3000);
      setTimeout(() => this.subject.next(random()), 4000);
      setTimeout(() => this.subject.complete(), 5000);
    }
  }


}
