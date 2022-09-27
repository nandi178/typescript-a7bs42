import { interval, Observable, Subject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

console.clear();

const intervalMs = 500;

const idozitoObserver = new Observable<number>((observer) => {
  let counter = 0;
  const idozito = setInterval(() => {
    counter++;
    //  console.warn('esemény emittálás');
    observer.next(counter);

    if (counter === 5) {
      //console.warn('hiba emittálás');
      observer.error('5. emittálás! Hiba történt.');
    }
  }, intervalMs);

  return () => clearInterval(idozito);
}).pipe(
  //tap((e) => console.warn('Tap into observable: ', e)),
  map((e) => e + 2)
);

const s = new Subject();
idozitoObserver.subscribe(s);

const subscription = s.subscribe(
  (res) => console.warn('Sub1 - Observable emits', res),
  (err) => console.warn('Sub1 - Observable error:', err),
  () => console.warn('Observable completed')
);

const subscription2 = s.pipe(filter((e) => e % 2 === 1)).subscribe(
  (res) => console.warn('Sub2 - Observable emits', res),
  (err) => console.warn('Sub2 - Observable error:', err),
  () => console.warn('Observable completed')
);
