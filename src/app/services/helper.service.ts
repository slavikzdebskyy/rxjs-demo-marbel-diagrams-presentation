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
    if (num >= 19 && num < 30) {
      return 'Observable';
    }
    if (num >= 31 && num < 37) {
      return 'Create Observable';
    }
    if (num >= 37 && num < 37) {
      return 'Operators';
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
    // if (num >= 31) {
    //   return 'Operators';
    // }

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

      default:
        return true;
    }
  }





  public test() {


  }

}
