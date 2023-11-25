import { Observable, Subject } from "rxjs";

export abstract class GenericMessage {
  public abstract id: string;
}

export abstract class CallbackMessage<T> extends GenericMessage{
  protected result$ = new Subject<T>();
  public result: Observable<T> = this.result$.asObservable();

  public finish(value: T): void {
    this.result$.next(value);
    this.result$.complete();
  }
}
