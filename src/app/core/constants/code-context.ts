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

  stream.subscribe(
    next => consoleNext(next),
    error => errorHandler(error),
    complete => consoleComplete(complete)
  )
  \`\`\`
  `,

};




