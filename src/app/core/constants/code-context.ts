const symbol = '';
const num = '';

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

  \`\`\`
  `,
};







