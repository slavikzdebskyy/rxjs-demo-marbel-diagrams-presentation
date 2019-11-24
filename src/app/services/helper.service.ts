import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  public getTitle(slideNumber: string): string {
    switch (slideNumber) {
      case '9':
        return 'Push value';
      case '10':
        return 'Promise';
      case '11':
        return 'Iterable value';
      case '12':
        return 'Observable';
      case '13':
        return 'Observable';
      case '14':
        return 'Observable';
      case '15':
        return 'Observer pattern';
      case '16':
        return 'Observer pattern';
      case '17':
        return 'Iterator pattern';
      case '18':
        return 'Iterator pattern';
      case '19':
        return 'Observable';

      default:
        return 'Reactive programming';
    }
  }

  public isShowBtn(slideNumber: string): boolean {
    switch (slideNumber) {
      case '20':
        return true;

      default:
        return false;
    }
  }





  public test() {



  }

}
