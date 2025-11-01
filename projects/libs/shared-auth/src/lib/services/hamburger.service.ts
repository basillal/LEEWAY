import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root' // Ensures a single instance across the app
})
export class HamburgerService {
  private sidebarOpenSubject = new BehaviorSubject<boolean>(false);
  sidebarOpen$ = this.sidebarOpenSubject.asObservable();

  // Track if we're in mobile view
  isMobileView$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 767px)'])
    .pipe(
      map(result => result.matches),
      shareReplay(1)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  toggleSidebar() {
    this.sidebarOpenSubject.next(!this.sidebarOpenSubject.value);
  }

  closeSidebar() {
    this.sidebarOpenSubject.next(false);
  }

  openSidebar() {
    this.sidebarOpenSubject.next(true);
  }


  
}
