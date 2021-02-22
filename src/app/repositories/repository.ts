import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export abstract class Repository<T> {
  entities$ = new BehaviorSubject<T[]>([]);

  performAction(action: RepositoryAction<T>): void {
    try {
      const result = action.run(this.entities$.getValue());
      this.entities$.next(result);
    } catch (error) {
      console.error('Error performing action', { action, error });
    }
  }
}

export abstract class LocalStorageRepository<T> extends Repository<T> {
  abstract localStorageKey: string;

  constructor() {
    super();
    setTimeout(() => {
      this.attemptToRestore();
      this.entities$
        .pipe(
          tap((entities) =>
            localStorage.setItem(this.localStorageKey, this.serialize(entities))
          )
        )
        .subscribe();
    }, 1);
  }

  attemptToRestore(): void {
    const json = localStorage.getItem(this.localStorageKey);
    if (json) {
      const data = this.deserialize(json);
      this.entities$.next(data);
    } else {
      console.log('no data present', this.localStorageKey);
    }
  }

  serialize(o: T[]): string {
    return JSON.stringify(o, null, 2);
  }
  deserialize(s: string): T[] {
    return JSON.parse(s);
  }
}

export abstract class RepositoryAction<T> {
  constructor(protected payload: any) {}
  abstract type: string;
  abstract run(data: T[]): T[];
}
