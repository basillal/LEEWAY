import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeftMenuLibService {
  breadcrumbs: any;
  policies: any;
  leftMenuSubBanner$ = new BehaviorSubject<any>('');
  submenus: any;
  leftMenuBanner$!: Observable<{ type: string; data: any }>;

  constructor() { }
}
