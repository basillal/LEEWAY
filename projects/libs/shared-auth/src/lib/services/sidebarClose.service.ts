import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarState = new BehaviorSubject<boolean>(false);
  sidebarState$ = this.sidebarState.asObservable();

  openSidebar() {
    this.sidebarState.next(true);
  }

  closeSidebar() {
    this.sidebarState.next(false);
  }

  toggleSidebar() {
    this.sidebarState.next(!this.sidebarState.value);
  }

  saveSidebarMenu(menu: any) {
    const isJsonString = (value: any) => {
      try {
        JSON.parse(value);
        return typeof value === 'string';
      } catch {
        return false;
      }
    };
  
    sessionStorage.setItem('sidebarMenu', isJsonString(menu) ? menu : JSON.stringify(menu));
  }
  

  getCurrentSidebarMenu() {
    const menu = sessionStorage.getItem('sidebarMenu');
    return menu ? JSON.parse(menu) : null;
  }
  

  getSidebarState(): boolean {
    return this.sidebarState.value;
  }
}
