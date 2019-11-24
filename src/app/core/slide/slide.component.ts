import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, map, tap, filter, takeWhile, finalize, distinctUntilChanged, delay, take } from 'rxjs/operators';
import { EntryItem } from 'src/app/intrfaces/entry-item.interface';
import { MarbleDiagramsComponent } from 'src/app/shared/marble-diagrams/marble-diagrams.component';
import { fromEvent, Subscription, timer, interval, of, Subject, Observable } from 'rxjs';

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





  private startStream(): void {

    const stream_1: Observable<any> = new Observable<any>(observer => {
    observer.next(1);
    setTimeout(() => observer.next(2), 1000);
    setTimeout(() => observer.next(3), 2000);
    setTimeout(() => observer.next(4), 3000);
    setTimeout(() => observer.complete(), 4000);
  });

    const subId = stream_1
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
        subId.unsubscribe();
      })
    )
    .subscribe();
  }


}
