import { Injectable } from '@angular/core';
import { of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  public getTitle(slideNumber: string): string {
    const num: number = parseInt(slideNumber, 10);

    if (num === 9) {
      return 'Push value';
    }
    if (num === 10) {
      return 'Promise';
    }
    if (num === 11) {
      return 'Iterable value';
    }
    if (num >= 12 && num < 15) {
      return 'Observable';
    }
    if (num >= 15 && num < 19) {
      return 'Observer pattern';
    }
    if (num === 20) {
      return 'Observable';
    }
    if (num === 21) {
      return 'Observable vs Promise';
    }
    if (num >= 22 && num < 24) {
      return 'Observable & unsubscribe()';
    }
    if (num >= 24 && num < 31) {
      return 'Observable';
    }
    if (num >= 31 && num < 39) {
      return 'Create Observable';
    }
    if (num === 39) {
      return 'Pipe';
    }
    if (num === 40 || num === 41) {
      return 'merge()';
    }
    if (num === 42) {
      return 'combineLatest()';
    }
    if (num === 43) {
      return 'mergeMap()';
    }
    if (num === 44) {
      return 'switchMap()';
    }
    if (num === 45 || num === 46) {
      return 'Promise <-> Observable';
    }
    if (num === 47 || num === 48) {
      return 'switchMap + Promise';
    }
    if (num === 49) {
      return 'Demo Input events';
    }
    if (num === 50) {
      return 'Demo Input events / debounceTime()';
    }
    if (num === 51) {
      return 'Demo Input events / distinctUntilChanged()';
    }
    if (num === 52) {
      return 'Demo Input events / switchMap()';
    }
    if (num >= 53 && num < 58) {
      return 'Subject';
    }
    if (num === 58) {
      return 'Subject  |  join Observable & Observer';
    }
    if (num >= 59 && num < 60) {
      return 'Subject';
    }
    if (num >= 60 && num < 70) {
      return 'unsubscribe()';
    }
    if (num >= 70 && num < 74 ) {
      return 'Auth example';
    }
    if (num >= 74 && num < 76) {
      return 'Subject';
    }



    return 'Reactive programming';
  }

  public isShowBtn(slideNumber: string): boolean {
    switch (slideNumber) {
      case '20':
        return true;
      case '38':
        return true;
      case '41':
        return true;
      case '42':
        return true;
      case '43':
        return true;
      case '44':
        return true;
      case '46':
        return true;
      case '48':
        return true;
      case '57':
        return true;
      case '59':
        return true;
      case '74':
        return true;
      case '75':
        return true;

      default:
        return false;
    }
  }

  public isShowSlideHeader(slideNumber: string): boolean {
    switch (slideNumber) {
      case '1':
        return false;
      case '7':
        return false;
      case '14':
        return false;
      case '19':
        return false;
      case '30':
        return false;
      case '53':
        return false;
      case '76':
        return false;

      default:
        return true;
    }
  }





  public test() {


  }

}
