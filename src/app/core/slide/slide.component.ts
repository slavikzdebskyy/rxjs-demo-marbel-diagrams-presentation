import { Component, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, map, tap, filter, takeWhile, finalize, distinctUntilChanged, delay } from 'rxjs/operators';
import { EntryItem } from 'src/app/intrfaces/entry-item.interface';
import { MarbleDiagramsComponent } from 'src/app/shared/marble-diagrams/marble-diagrams.component';
import { fromEvent, Subscription, timer, interval, of, Subject } from 'rxjs';

@Component({
  selector: 'rxjs-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
  // directives: [MarbleDiagramsComponent]
})
export class SlideComponent implements OnDestroy{

  private readonly colors = [
    '#4287f5',
    '#4ef542',
    '#fa1148',
    '#e8e810'
  ];

  @ViewChild('diagramComp', {static: false})
  public diagramComp: MarbleDiagramsComponent;

  public entriesMain: EntryItem[];
  public entriesSecond: EntryItem[];
  public entriesThird: EntryItem[];
  public isStopFill: boolean;
  public hidden: boolean;
  public slideNumber: string;

  public offSetLeft: string;
  private colorIndex: number;
  private subs: Subscription;
  private subject: Subject<number>;


  constructor(private route: ActivatedRoute) {
    this.subs = new Subscription();
    this.subs.add(
      this.route.params
      .pipe(
        pluck('number'),
        distinctUntilChanged(),
      )
      .subscribe((slideNum: string) => {
        this.slideNumber = slideNum;
        this.InitAll();
      })
    );
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

  public get isShowBtns(): boolean {
    return parseInt(this.slideNumber, 10) > 1;
  }

  private InitAll(): void {
    this.colorIndex = 0;
    this.entriesMain = [];
    this.entriesSecond = [];
    this.entriesThird = [];
    this.isStopFill = false;
    this.hidden = true;
  }

  private pushEntryItem(arr: EntryItem[], value: string | number = 0, isLast = false): void {
    const entryItem: EntryItem = {
      value,
      isLast,
      offSetLeft: this.offSetLeft,
      color: isLast ? '#000' : this.colors[this.colorIndex],
    };

    arr.push(entryItem);
  }

  private incColorIndex() {
    if (this.colorIndex + 1 === this.colors.length) {
      this.colorIndex = 0;
    } else {
      this.colorIndex++;
    }
  }




  private startStream(): void {
      const subId = interval(1200)
      .pipe(
        tap((num: any) => {
          console.log(num);
          this.incColorIndex();
          this.isStopFill = num > 7;
          if (!this.isStopFill) {
            this.pushEntryItem(this.entriesMain, num);
          }
        }),
        takeWhile(() => !this.isStopFill),
        finalize(() => {
          this.pushEntryItem(this.entriesMain, '', true);
          this.pushEntryItem(this.entriesSecond, '', true);
          subId.unsubscribe();
        }),
      )
      .subscribe((res: number) => {
        this.pushEntryItem(this.entriesSecond, res);
      });

  }



}
