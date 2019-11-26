import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, map, tap, filter, takeWhile, finalize, distinctUntilChanged, delay, take, debounceTime, mergeMap } from 'rxjs/operators';
import { EntryItem } from 'src/app/intrfaces/entry-item.interface';
import { MarbleDiagramsComponent } from 'src/app/shared/marble-diagrams/marble-diagrams.component';
import { fromEvent, Subscription, timer, interval, of, Subject, Observable, pipe, merge, combineLatest } from 'rxjs';

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

  public entriesMain: EntryItem[];
  public entriesSecond: EntryItem[];
  public entriesThird: EntryItem[];
  public isStopFill: boolean;
  public isShowSlideHeader: boolean;
  public hidden: boolean;
  public isShowBtn: boolean;
  public slideNumber: string;
  public sliderHeader: string;
  public content: {[key: string]: string};

  public offSetLeft: string;
  private colorIndex: number;
  private subs: Subscription;
  private subject: Subject<number>;


  constructor(
    private route: ActivatedRoute,
    private helperService: HelperService
  ) {
    this.subs = new Subscription();
    this.isShowBtn = false;
    this.content = CODE_CONTEXT;

    this.routeListener();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public startDemo(): void {
    this.hidden = false;
    this.diagramComp.startFill();
    this.startStream();
  }

  public calcOffsetLeft(value: string): void {
    this.offSetLeft = value;
  }

  private InitAll(): void {
    this.colorIndex = 0;
    this.entriesMain = [];
    this.entriesSecond = [];
    this.entriesThird = [];
    this.isStopFill = false;
    this.hidden = true;
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
        this.InitAll();
        this.sliderHeader = this.helperService.getTitle(slideNum);
        this.isShowBtn = this.helperService.isShowBtn(slideNum);
        this.isShowSlideHeader = this.helperService.isShowSlideHeader(slideNum);
      })
    );
  }

  private pushEntryItem(arr: EntryItem[], value: string | number = 0, isLast = false): void {
    const entryItem: EntryItem = {
      value,
      isLast,
      offSetLeft: this.offSetLeft,
      color: isLast ? '#000' : COLORS[this.colorIndex],
    };

    arr.push(entryItem);
  }

  private incColorIndex() {
    if (this.colorIndex + 1 === COLORS.length) {
      this.colorIndex = 0;
    } else {
      this.colorIndex++;
    }
  }

  reset(): void {
    this.subs.unsubscribe();
  }



  private startStream(): void {
    this.InitAll();

    if (this.slideNumber === '20') {
      this.hidden = false;
      const stream$1: Observable<any> = new Observable<any>(observer => {
        observer.next(1);
        setTimeout(() => observer.next(2), 1000);
        setTimeout(() => observer.next(3), 2000);
        setTimeout(() => observer.next(4), 3000);
        setTimeout(() => observer.complete(), 4000);
      });

      const subId20 = stream$1
      .pipe(
        tap((num: number) => {
          this.incColorIndex();
          if (!this.isStopFill) {
            this.pushEntryItem(this.entriesMain, num);
          }
        }),
        finalize(() => {
          this.isStopFill = true;
          this.pushEntryItem(this.entriesMain, '', true);
        })
      )
      .subscribe();

      this.subs.add(subId20);
    }

    if (this.slideNumber === '38') {
      this.hidden = false;
      const subId38 = interval(1000)
      .pipe(
        tap((num: number)  => {
          this.isStopFill = num >= 8;
          if (this.isStopFill) {
            this.pushEntryItem(this.entriesMain, '', true);
            this.pushEntryItem(this.entriesSecond, '', true);
          }
        }),
        filter(() => !this.isStopFill),
        tap((num: number) => {
          this.incColorIndex();
          if (!this.isStopFill) {
            this.pushEntryItem(this.entriesMain, num);
          }
        }),
        filter(() => Math.random() < 0.3),
        tap((num: number) => {
          this.incColorIndex();
          if (!this.isStopFill) {
            this.pushEntryItem(this.entriesSecond, num);
          }
        }),
      )
      .subscribe();

      this.subs.add(subId38);
    }


    if (this.slideNumber === '41') {
      this.hidden = false;

      const streamFirst = timer(0, 1700)
        .pipe(
          take(5),
          filter(() => !this.isStopFill),
          tap(num => {
            this.incColorIndex();
            this.pushEntryItem(this.entriesMain, num);
          })
        );

      const streamSecond = timer(700, 1700)
        .pipe(
          map(i => {
            this.isStopFill = i >= 6;
            return 'abcdfghi'[i];
          }),
          take(7),
          tap(() => {
            if (this.isStopFill) {
              this.pushEntryItem(this.entriesMain, '', true);
              this.pushEntryItem(this.entriesSecond, '', true);
              this.pushEntryItem(this.entriesThird, '', true);
            }
          }),
          filter(() => !this.isStopFill),
          tap(val => {
            this.incColorIndex();
            if (!this.isStopFill) {
              this.pushEntryItem(this.entriesSecond, val);
            }
          })
        );

      const subId41 = merge(streamFirst, streamSecond)
          .subscribe(val => {
            if (!this.isStopFill) {
              this.pushEntryItem(this.entriesThird, val);
            }
          });
      this.subs.add(subId41);
    }

    if (this.slideNumber === '42') {
      this.hidden = false;

      const streamFirst = timer(0, 1700)
        .pipe(
          take(5),
          filter(() => !this.isStopFill),
          tap(num => {
            this.incColorIndex();
            this.pushEntryItem(this.entriesMain, num);
          })
        );

      const streamSecond = timer(700, 1700)
        .pipe(
          map(i => {
            this.isStopFill = i >= 6;
            return 'abcdfghi'[i];
          }),
          take(7),
          tap(() => {
            if (this.isStopFill) {
              this.pushEntryItem(this.entriesMain, '', true);
              this.pushEntryItem(this.entriesSecond, '', true);
              this.pushEntryItem(this.entriesThird, '', true);
            }
          }),
          filter(() => !this.isStopFill),
          tap(val => {
            this.incColorIndex();
            if (!this.isStopFill) {
              this.pushEntryItem(this.entriesSecond, val);
            }
          })
        );

      const subId42 = combineLatest(streamFirst, streamSecond)
          .subscribe(val => {
            if (!this.isStopFill) {
              this.pushEntryItem(this.entriesThird, val.join(''));
            }
          });
      this.subs.add(subId42);
    }

    if (this.slideNumber === '43') {
      this.hidden = false;

      timer(0, 1500)
        .pipe(
          take(4),
          map(i => 'abcd'[i]),
          tap(num => {
            this.incColorIndex();
            this.pushEntryItem(this.entriesMain, num);
          }),
          mergeMap(symbol => timer(0, 900).pipe(
            filter(() => !this.isStopFill),
            map(num => {
              // this.isStopFill = num >= 7;
              if (!this.isStopFill) {
                this.pushEntryItem(this.entriesSecond, `${symbol} ${num}`);
              }
              return `${symbol} ${num}`;
            }),
            take(9),
          )),
          finalize(() => {
            // if (this.isStopFill) {
              this.isStopFill = true;
              this.pushEntryItem(this.entriesMain, '', true);
              this.pushEntryItem(this.entriesSecond, '', true);
            // }
          }),
        ).subscribe(
          // res => {
          //   if (!this.isStopFill) {
          //     this.pushEntryItem(this.entriesSecond, res);
          //   }
          // },
        );
    }

    if (this.slideNumber === '') {

    }
    if (this.slideNumber === '') {

    }
    if (this.slideNumber === '') {

    }
    if (this.slideNumber === '') {

    }
    if (this.slideNumber === '') {

    }

  }


}
