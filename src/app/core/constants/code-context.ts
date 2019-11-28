const symbol = '${symbol}';
const num = '${num}';
const value = '${value}';

export const CODE_CONTEXT: {[key: string]: string} = {
  observerPattern: ` \`\`\`javascript
  class Subject {

    constructor () {
      this.observers = [];
    }

    add(observer) {...}

    remove(observer) {...}

    notify(value) {
      this.observers.forEach(observer => {
        observer.update(value);
      });
    }
  }
  \`\`\`
  `,

  iteratorPattern: ` \`\`\`javascript
  class Iterator {

    next() {...}

    hasNext() {...}
  }
  \`\`\`
  `,

  newObservable: ` \`\`\`javascript
  const stream = new Observable(observer => {
    observer.next(1);
    setTimeout(() => observer.next(2), 1000);
    setTimeout(() => observer.next(3), 2000);
    setTimeout(() => observer.next(4), 3000);
    setTimeout(() => observer.complete(), 4000);
  });

  const subscription = stream.subscribe(
    next => consoleNext(next),
    error => errorHandler(error),
    complete => consoleComplete(complete)
  )
  \`\`\`
  `,

  observableVsPromise: ` \`\`\`javascript
  const stream: Observable = new Observable(observer => {
    observer.next(1);
    setTimeout(() => observer.next(2), 1000);
    setTimeout(() => observer.next(3), 2000);
    setTimeout(() => observer.next(4), 3000);
    setTimeout(() => observer.complete(), 4000);
  });

  const subscription = stream.subscribe(
    next => consoleNext(next),
    error => errorHandler(error),
    complete => consoleComplete(complete)
  )

  const promise = new Promise((resolve, reject) => {
    resolve(1);
  })
  \`\`\`
  `,

  subsunsubs: ` \`\`\`javascript
  const stream: Observable = new Observable(observer => {
    const interval = setInterval(() => observer.next(1), 1000);
  });

  const subscription = stream.subscribe(...)

  subscription.unsubscribe();

  \`\`\`
  `,

  clearInterval: ` \`\`\`javascript
  const stream: Observable = new Observable(observer => {
    const interval = setInterval(() => observer.next(1), 1000);

    return function unsubscribe() {
      clearInterval(interval);
    }
  });

  const subscription = stream.subscribe(...)

  subscription.unsubscribe();

  \`\`\`
  `,

  aboutSubs_1: ` \`\`\`javascript
  //  Subscription is required

  const stream: Observable = new Observable(observer => {...});
  \`\`\`
  `,

  aboutSubs_2: ` \`\`\`javascript
  const stream: Observable = new Observable(observer => {...});

  const subscription = stream.subscribe(observer_A)
  \`\`\`
  `,

  aboutSubs_3: ` \`\`\`javascript
  //  Subscriptions are independent of each other

  const stream: Observable = new Observable(observer => {...});
  \`\`\`
  `,

  aboutSubs_4: ` \`\`\`javascript
  //  Subscriptions are independent of each other

  const stream: Observable = new Observable(observer => {...});

  const subscription = stream.subscribe(observer_A);
  \`\`\`
  `,

  aboutSubs_5: ` \`\`\`javascript
  //  Subscriptions are independent of each other

  const stream: Observable = new Observable(observer => {...});

  const subscription = stream.subscribe(observer_A);
  const subscription = stream.subscribe(observer_B);
  const subscription = stream.subscribe(observer_BC);
  \`\`\`
  `,

  operators_create: ` \`\`\`javascript
  of('some value')

  // --- some value --- |

  \`\`\`
  `,

  operators_create_1: ` \`\`\`javascript
  of('some value')

  // --- some value --- |

  from(['a', 'b', 'c', 'd'])

  // --- a --- b --- c --- d --- |

  \`\`\`
  `,

  operators_create_2: ` \`\`\`javascript
  of('some value')

  // --- some value --- |

  from(['a', 'b', 'c', 'd'])

  // --- a --- b --- c --- d --- |

  timer(500, 1000)

  // --- 1 --- 2 --- 3 --- 4 --...

  \`\`\`
  `,

  operators_create_3: ` \`\`\`javascript
  of('some value')

  // --- some value --- |

  from(['a', 'b', 'c', 'd'])

  // --- a --- b --- c --- d --- |

  timer(500, 1000)

  // --- 1 --- 2 --- 3 --- 4 --...

  interval(1000)

  // - 1 - 2 - 3 - 4 - 5 -...
  \`\`\`
  `,

  operators_create_4: ` \`\`\`javascript
  const promise = new Promise((resolve) => { resolve('some value')});

  from(promise)

  // ----------------- some value-|
  \`\`\`
  `,

  operators_create_5: ` \`\`\`javascript
  const promise = new Promise((resolve) => { resolve('some value')});

  from(promise)

  // ----------------- some value-|


  const btn = document.getElemetById('my-btn');

  formEvent(btn, 'click');

  // --event---event-event--event--------event--event------event-event-...
  \`\`\`
  `,

  operators_demo_1: ` \`\`\`javascript
  const subscriptionFirst = interval(1000)
    .pipe(
      take(8),
    ).subscribe(
      next => {...};
    )

  \`\`\`
  `,

  operators_demo_2: ` \`\`\`javascript
  const subscriptionFirst = interval(1000)
    .pipe(
      take(8),
    ).subscribe(
      next => {...};
    )

  const subscriptionSecond = interval(1000)
    .pipe(
      take(8),
      filter(() => Math.random > 0.3),
    ).subscribe(
      next => {...}
    )
  \`\`\`
  `,

  pipe_1: ` \`\`\`javascript
  .pipe(
  \`\`\`
  `,

  pipe_2: ` \`\`\`javascript
  ).subscribe()
  \`\`\`
  `,

  merge: ` \`\`\`javascript
  const streamFirst = timer(0, 1700)
    .pipe(
      take(5),
    );

  \`\`\`
  `,

  merge_1: ` \`\`\`javascript
  const streamFirst = timer(0, 1700)
    .pipe(
      take(5),
    );

  const streamSecond = timer(700, 1700)
    .pipe(
      map(i => 'abcdfghi'[i]),
      take(7),
    );

  merge(streamFirst, streamSecond)
      .subscribe(val => {...})
  \`\`\`
  `,

  combineLatest: ` \`\`\`javascript
  const streamFirst = timer(0, 1700)
    .pipe(
      take(5),
    );

  const streamSecond = timer(700, 1700)
    .pipe(
      map(i => 'abcdfghi'[i]),
      take(7),
    );

    combineLatest(streamFirst, streamSecond)
      .subscribe(val => {...})
  \`\`\`
  `,

  mergeMap: ` \`\`\`javascript
  timer(0, 1500)
  .pipe(
    take(4),
    map(i => 'abcd'[i]),
    mergeMap(symbol => timer(0, 900).pipe(
      take(6),
      map(num => \`${symbol} ${num}\`),
    )),
  );
  \`\`\`
  `,

  switchMap: ` \`\`\`javascript
  timer(0, 1500)
  .pipe(
    take(4),
    map(i => 'abcd'[i]),
    switchMap(symbol => timer(0, 900).pipe(
      take(6),
      map(num => \`${symbol} ${num}\`),
    )),
  );
  \`\`\`
  `,

  switchMap_2: ` \`\`\`javascript
  const getPromise = val => new Promise((resolve) => {
    setTimeout(() => {
      resolve(val);
    }, 1500);
  });

  this.streamFirst = from(getPromise('🤡'));
  \`\`\`
  `,

  switchMap_3: ` \`\`\`javascript
  streamFirst = new Observable(observer => {
    observer.next(1);
    setTimeout(() => observer.next(2), 2000);
    setTimeout(() => observer.next(3), 3000);
    setTimeout(() => observer.complete(), 4000);
  });
  \`\`\`
  `,

  switchMap_4: ` \`\`\`javascript
  streamFirst = new Observable(observer => {
    observer.next(1);
    setTimeout(() => observer.next(2), 2000);
    setTimeout(() => observer.next(3), 3000);
    setTimeout(() => observer.complete(), 4000);
  });

  streamSecond = streamFirst
    .pipe(
      switchMap(val => getPromise(val)),
    );

  \`\`\`
  `,

  input_demo_1: ` \`\`\`javascript
  fromEvent(inputElement, 'input')
    .pipe(
      map(event => event.target.value)
    )
    .subscribe(value => {
      console.log(value);
    })

  \`\`\`
  `,

  input_demo_2: ` \`\`\`javascript
  fromEvent(inputElement, 'input')
    .pipe(
      pluck('target', 'value'),
      debounceTime(500),
    )
    .subscribe(value => {
      console.log(value);
    })

  \`\`\`
  `,

  input_demo_3: ` \`\`\`javascript
  fromEvent(inputElement, 'input')
    .pipe(
      pluck('target', 'value'),
      debounceTime(500),
      distinctUntilChanged(),
    )
    .subscribe(value => {
      console.log(value);
    })

  \`\`\`
  `,

  input_demo_4: ` \`\`\`javascript
  fromEvent(inputElement, 'input')
    .pipe(
      pluck('target', 'value'),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(value => getData(\`http://dummy.restapiexample.com/api/v1/employee/${value}\`)),
    )
    .subscribe(value => {
      console.log(value);
    })

  \`\`\`
  `,

  subject_1: ` \`\`\`javascript
  const random = () => Math.floor(Math.random() * 100);

  const stream = timer(0, 1000)
    .pipe(
      take(7),
      map(() => random()),
    );

  \`\`\`
  `,

  subject_2: ` \`\`\`javascript
  const random = () => Math.floor(Math.random() * 100);

  const stream = timer(0, 1000)
    .pipe(
      take(7),
      map(() => random()),
    );

  stream.subscribe();

  \`\`\`
  `,

  subject_3: ` \`\`\`javascript
  const random = () => Math.floor(Math.random() * 100);

  const stream = timer(0, 1000)
    .pipe(
      take(7),
      map(() => random()),
    );

  stream.subscribe();
  stream.subscribe();

  \`\`\`
  `,

  subject_4: ` \`\`\`javascript
  const random = () => Math.floor(Math.random() * 100);

  const stream = timer(0, 1000)
    .pipe(
      take(7),
      map(() => random()),
    );

  stream.subscribe();
  stream.subscribe();
  setTimeout(() => {
    stream.subscribe();
  }, 1500);

  \`\`\`
  `,

  subject_5: ` \`\`\`javascript
  const subject = new Subject();

  subject.next(random());
  setTimeout(() => subject.next(random()), 1000);
  setTimeout(() => subject.next(random()), 2000);
  setTimeout(() => subject.next(random()), 3000);
  setTimeout(() => subject.next(random()), 4000);
  setTimeout(() => subject.complete(), 5000);

  \`\`\`
  `,

  subject_6: ` \`\`\`javascript
  const subject = new Subject();

  subject.next(random());
  setTimeout(() => subject.next(random()), 1000);
  setTimeout(() => subject.next(random()), 2000);
  setTimeout(() => subject.next(random()), 3000);
  setTimeout(() => subject.next(random()), 4000);
  setTimeout(() => subject.complete(), 5000);

  subject.subscribe();
  setTimeout(() => subject.subscribe(), 1200);
  setTimeout(() => subject.subscribe(), 2200);

  \`\`\`
  `,

  unsubscribe_1: ` \`\`\`javascript
  const subscription = stream
    .pipe(
      map(...),
      switchMap(...),
    )
    .subscribe();

  \`\`\`
  `,

  unsubscribe_2: ` \`\`\`javascript
  const subscription = stream
    .pipe(
      map(...),
      switchMap(...),
    )
    .subscribe();

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  \`\`\`
  `,

  unsubscribe_3: ` \`\`\`javascript
  const subscription = stream
    .pipe(
      map(...),
      switchMap(...),
    )
    .subscribe();

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  \`\`\`
  `,

  unsubscribe_4: ` \`\`\`javascript
  const subscription = stream
    .pipe(
      map(...),
      switchMap(...),
    )
    .subscribe();

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
  }

  \`\`\`
  `,

  unsubscribe_5: ` \`\`\`javascript
  const subscription = stream
    .pipe(
      map(...),
      switchMap(...),
    )
    .subscribe();

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
    ...
  }

  \`\`\`
  `,

  unsubscribe_6: ` \`\`\`javascript
  const destroyStream = new Subject();

  stream
    .pipe(
      map(...),
      switchMap(...),
      takeUntil(destroyStream),
    )
    .subscribe();

  \`\`\`
  `,

  unsubscribe_7: ` \`\`\`javascript
  const destroyStream = new Subject();

  stream
    .pipe(
      map(...),
      switchMap(...),
      takeUntil(destroyStream),
    )
    .subscribe();

  public ngOnDestroy(): void {
    destroyStream.next();
  }

  \`\`\`
  `,

  unsubscribe_8: ` \`\`\`javascript
  const subscriptions = new Subscription();

  const subscription = stream
    .pipe(
      map(...),
      switchMap(...),
    )
    .subscribe();

    subscriptions.add(subscription);

  \`\`\`
  `,

  unsubscribe_9: ` \`\`\`javascript
  const subscriptions = new Subscription();

  const subscription = stream
    .pipe(
      map(...),
      switchMap(...),
    )
    .subscribe();

    subscriptions.add(subscription);
    subscriptions.add(subscription1);
    subscriptions.add(subscription2);

  \`\`\`
  `,

  unsubscribe_10: ` \`\`\`javascript
  const subscriptions = new Subscription();

  const subscription = stream
    .pipe(
      map(...),
      switchMap(...),
    )
    .subscribe();

    subscriptions.add(subscription);
    subscriptions.add(subscription1);
    subscriptions.add(subscription2);

    public ngOnDestroy(): void {
      subscriptions.unsubscribe();
    }

  \`\`\`
  `,

  auth_1: ` \`\`\`javascript
  class AuthService {
    private authSubject = new BehaviorSubject<boolean>(false);

  }

  \`\`\`
  `,

  auth_2: ` \`\`\`javascript
  class AuthService {
    private authSubject = new BehaviorSubject<boolean>(false);

    setAuthState(state: boolean): void {
      this.authSubject.next(state);
    }
  }

  \`\`\`
  `,

  auth_3: ` \`\`\`javascript
  class AuthService {
    private authSubject = new BehaviorSubject<boolean>(false);

    setAuthState(state: boolean): void {...}

    getState(): Observable<boolean> {
      return this.authSubject.asObservable();
    }

  }

  \`\`\`
  `,

  auth_4: ` \`\`\`javascript
  class AuthService {
    private authSubject = new BehaviorSubject<boolean>(false);

    setAuthState(state: boolean): void {...}

    getState(): Observable<boolean> {...}

    getCurrentState(): boolean {
      return this.authSubject.getValue();
    }

  }

  \`\`\`
  `,

  fetch_subj_1: ` \`\`\`javascript
  const stream = this.http.get('https://jsonplaceholder.typicode.com/todos/1');

  stream.subscribe(
    res => console.log(res),
  );

  setTimeout(() => {
    stream.subscribe(res => console.log(res));
  }, 1500);

  \`\`\`
  `,

  fetch_subj_2: ` \`\`\`javascript
  const subject = new BehaviorSubject<any>(null);
  const stream = this.http.get('https://jsonplaceholder.typicode.com/todos/1');

  stream
    .pipe(
      tap(value => subject.next(value))
    )
  .subscribe();

  subject
    .pipe(filter(Boolean))
    .subscribe(res => console.log(res));

  setTimeout(() => {
    subject.subscribe(res => console.log(res));
  }, 1500);

  setTimeout(() => {
    subject.subscribe(res => console.log(res));
  }, 2500);
  \`\`\`
  `,

  bon_filter_1: ` \`\`\`javascript
  const array = [0, null, 36, 'q', 78, 102, undefined, 's', 32, 1, '23', 49, 57];

  const streamFirst = timer(0, 1000)
    .pipe(
      take(10),
      map(i => array[i]),
    );

  \`\`\`
  `,

  bon_filter_2: ` \`\`\`javascript
  const array = [0, null, 36, 'q', 78, 102, undefined, 's', 32, 1, '23', 49, 57];

  const streamFirst = timer(0, 1000)
    .pipe(...);

  const streamSecond = timer(0, 1000)
    .pipe(
      take(10),
      map(i => array[i]),
      skipWhile(num => !num),
    );

  \`\`\`
  `,

  bon_filter_3: ` \`\`\`javascript
  const array = [0, null, 36, 'q', 78, 102, undefined, 's', 32, 1, '23', 49, 57];

  const streamFirst = timer(0, 1000)
    .pipe(...);

  const streamSecond = timer(0, 1000)
    .pipe(... skipWhile(num => !num),
    );

  const streamThird = timer(0, 1000)
    .pipe(
      take(10),
      map(i => array[i]),
      filter(Boolean),
    );

  \`\`\`
  `,

  bon_concat_1: ` \`\`\`javascript
  const streamOne = timer(0, 800)
  .pipe(
    take(6),
    map(i => 'abcdfghijklmn'[i]),
  );

  const streamTwo = timer(0, 1200)
    .pipe(
      take(5),
    );

  \`\`\`
  `,

  bon_concat_2: ` \`\`\`javascript
  const streamOne = timer(0, 800)
  .pipe(
    take(6),
    map(i => 'abcdfghijklmn'[i]),
  );

  const streamTwo = timer(0, 1200)
    .pipe(
      take(5),
    );

  const streamFirst = forkJoin(streamOne, streamTwo);

  const streamSecond = concat(streamOne, streamTwo);

  \`\`\`
  `,

  bon_cutom_func_1: ` \`\`\`javascript
  const array = [2, 7, 12, 4, 9, 15, 70, 2, 20];

  function customFilter() {
    return stream => {
      return stream
      .pipe(
        filter(val => val > 10),
      );
    };
  }

  \`\`\`
  `,

  bon_cutom_func_2: ` \`\`\`javascript
  const array = [[2, 7, 12, 4, 9, 15, 70, 2, 20, 32, 1, 17, 5];

  function customFilter() {
    return stream => {
      return stream
      .pipe(
        filter(val => val > 10),
      );
    };
  }

  const streamFirst = timer(0, 800)     const streamSecond = timer(0, 800)
    .pipe(                                .pipe(
      take(10),                              take(10),
      map(i => array[i]),                   map(i => array[i]),
    );                                      customFilter(),
                                          );
  \`\`\`
  `,

};







