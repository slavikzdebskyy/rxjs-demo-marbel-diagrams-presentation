import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { EntryItem } from 'src/app/intrfaces/entry-item.interface';




@Component({
  selector: 'rxjs-marble-diagrams',
  templateUrl: './marble-diagrams.component.html',
  styleUrls: ['./marble-diagrams.component.scss']
})
export class MarbleDiagramsComponent implements OnInit, OnDestroy {



  @ViewChild('filled', {static: true})
  public filled: ElementRef;

  @Input()
  public entriesMain: EntryItem[];
  @Input()
  public entriesSecond: EntryItem[];
  @Input()
  public entriesThird: EntryItem[];
  @Input()
  public isStopFill: boolean;
  @Input()
  public labels: string[];

  @Output()
  public calcOffsetLeft: EventEmitter<string>;

  public offSetLeft: number;

  private offSetLeftStart: number;
  private subs: Subscription;

  constructor() {
    this.subs = new Subscription();
    this.entriesMain = [];
    this.labels = [];
    this.isStopFill = false;
    this.calcOffsetLeft = new EventEmitter();
   }

  public ngOnInit(): void {
    this.offSetLeft = this.offSetLeftStart = this.filled.nativeElement.offsetLeft;
    // this.startFill();
    // this.startStream();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public get left(): string {
    return `${this.offSetLeft}px`;
  }

  public get isTriangleFilled(): boolean {
    return parseInt(this.left, 10) === 0;
  }

  public startFill(): void {
    const subId: Subscription = interval(15)
    .pipe(
      takeWhile(() => this.offSetLeft < 0 || !this.isStopFill),
    )
    .subscribe(() => {
      if (!this.isStopFill) {
        this.offSetLeft++;
        this.calcOffsetLeft.emit(`${this.offSetLeft - this.offSetLeftStart}px`);
      }
    });

    this.subs.add(subId);
  }



}
