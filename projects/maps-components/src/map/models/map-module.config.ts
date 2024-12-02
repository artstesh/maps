import { HttpInterceptorFn } from '@angular/common/http';

export class MapModuleConfig {
  constructor(public interseptors: HttpInterceptorFn[] = []) {}
}
