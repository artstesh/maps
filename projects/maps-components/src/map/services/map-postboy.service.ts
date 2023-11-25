import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GenericMessage } from "../messages";

@Injectable()
export class MapPostboyService {
  private applications: { [id: string]: Subject<any> } = {};

  public register<T>(id: string, sub: Subject<T>): void {
    this.applications[id] = sub;
  }

  public subscribe<T>(id: string): Observable<T> {
    if (!this.applications[id]) throw new Error(`There is no event with id ${id}`);
    return this.applications[id].asObservable();
  }

  fire<T extends GenericMessage>(message: T): void {
    if (!this.applications[message.id]) throw new Error(`There is no event with id ${message.id}`);
    this.applications[message.id].next(message);
  }
}
