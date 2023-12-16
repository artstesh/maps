import { Injectable } from '@angular/core';
import { PostboyService } from '@artstesh/postboy';
import { Observable } from "rxjs";

@Injectable()
export class MapPostboyService extends PostboyService {

  public observe = <T>(id: string): Observable<T> => this.subscribe<T>(id);
}
