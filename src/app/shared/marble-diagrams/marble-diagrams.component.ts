import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { Subscription, interval, Observable } from 'rxjs';
import { takeWhile, finalize } from 'rxjs/operators';
import { EntryItem } from 'src/app/intrfaces/entry-item.interface';
import { COLORS } from 'src/app/core/constants/other';

@Component({
  selector: 'rxjs-marble-diagrams',
  templateUrl: './marble-diagrams.component.html',
  styleUrls: ['./marble-diagrams.component.scss']
})
export class MarbleDiagramsComponent implements OnInit, OnDestroy {

  @ViewChild('filled', {static: true})
  public filled: ElementRef;

  public entriesMain: EntryItem[];
  public entriesSecond: EntryItem[];
  public entriesThird: EntryItem[];
  public offSetLeft1: number;
  public offSetLeft2: number;
  public offSetLeft3: number;

  @Input()
  public streamFirst: Observable<string>;
  @Input()
  public streamSecond: Observable<string>;
  @Input()
  public streamThird: Observable<string>;
  @Input()
  public labels: string[];

  private offSetLeftStart: number;
  private subs: Subscription;
  private colorIndex: number;

  constructor() {
    this.subs = new Subscription();
    this.entriesMain = [];
    this.entriesSecond = [];
    this.entriesThird = [];
    this.labels = [];
    this.colorIndex = 0;
   }

  public ngOnInit(): void {
    this.offSetLeft1 = this.offSetLeft2 = this.offSetLeft3 = this.offSetLeftStart = this.filled.nativeElement.offsetLeft;
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private initAll(): void {
    this.subs = new Subscription();
    this.entriesMain = [];
    this.entriesSecond = [];
    this.entriesThird = [];
    this.labels = [];
    this.colorIndex = 0;
  }

  public get left1(): string {
    return `${this.offSetLeft1}px`;
  }

  public get left2(): string {
    return `${this.offSetLeft2}px`;
  }

  public get left3(): string {
    return `${this.offSetLeft3}px`;
  }

  public get isTriangleFilled1(): boolean {
    return parseInt(this.left1, 10) === 0;
  }

  public get isTriangleFilled2(): boolean {
    return parseInt(this.left2, 10) === 0;
  }

  public get isTriangleFilled3(): boolean {
    return parseInt(this.left3, 10) === 0;
  }

  private pushEntryItem(arr: EntryItem[], value: string | number = 0, offset: number, isLast = false): void {
    const entryItem: EntryItem = {
      value,
      isLast,
      offSetLeft: isLast ? `${offset + 15 - this.offSetLeftStart}px` : `${offset - this.offSetLeftStart}px`,
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


  public startDemo(): void {

    if (this.streamFirst) {
      let isStopFillFirst = false;

      const subId: Subscription = interval(15)
      .pipe(
        takeWhile(() => this.offSetLeft1 < 0 || !isStopFillFirst),
      )
      .subscribe(() => {
        if (!isStopFillFirst) {
          this.offSetLeft1++;
        }
      });

      this.subs.add(subId);

      const subId2: Subscription = this.streamFirst
      .pipe(
        finalize(() => {
          isStopFillFirst = true;
          this.pushEntryItem(this.entriesMain, '', this.offSetLeft1, true);
        })
      )
      .subscribe(
        (res: string) => {
          this.incColorIndex();
          this.pushEntryItem(this.entriesMain, res, this.offSetLeft1);
        },
      );

      this.subs.add(subId2);
    }

    if (this.streamSecond) {
      let isStopFillSecond = false;

      const subId3: Subscription = interval(15)
      .pipe(
        takeWhile(() => this.offSetLeft2 < 0 || !isStopFillSecond),
      )
      .subscribe(() => {
        if (!isStopFillSecond) {
          this.offSetLeft2++;
        }
      });

      this.subs.add(subId3);

      const subId4: Subscription = this.streamSecond
      .pipe(
        finalize(() => {
          isStopFillSecond = true;
          this.pushEntryItem(this.entriesSecond, '', this.offSetLeft2, true);
        })
      )
      .subscribe(
        (res: string) => {
          this.incColorIndex();
          this.pushEntryItem(this.entriesSecond, res, this.offSetLeft2);
        },
      );

      this.subs.add(subId4);
    }

    if (this.streamThird) {
      let isStopFillThird = false;

      const subId5: Subscription = interval(15)
      .pipe(
        takeWhile(() => this.offSetLeft3 < 0 || !isStopFillThird),
      )
      .subscribe(() => {
        if (!isStopFillThird) {
          this.offSetLeft3++;
        }
      });

      this.subs.add(subId5);

      const subId6: Subscription = this.streamThird
      .pipe(
        finalize(() => {
          isStopFillThird = true;
          this.pushEntryItem(this.entriesThird, '', this.offSetLeft3, true);
        })
      )
      .subscribe(
        (res: string) => {
          this.pushEntryItem(this.entriesThird, res, this.offSetLeft3);
        },
      );

      this.subs.add(subId6);
    }

  }

}



