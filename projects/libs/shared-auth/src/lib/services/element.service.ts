import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ElementService {
  private menuData: any[] = [];


  // check the element permissions
  checkElementPermission(operation: 'create' | 'update'): boolean {
    const route = window.location.hash.substring(1);
    const storedData = localStorage.getItem('Routes');
    if (storedData) {
      this.menuData = JSON.parse(storedData);
    }
    if (!Array.isArray(this.menuData)) {
      console.error('Expected menuData to be an array but received:', this.menuData);
    }
    const isAllowed = this.checkOperationPermission(route, operation);
    return isAllowed;
  }



  //check the permission from localstorage
  private checkOperationPermission(route: string, operation: 'create' | 'update'): boolean {
    let operationAllowed = false;
    this.menuData.forEach((document: any) => {
      Object.entries(document).forEach((group: any) => {
        group[1].menus.forEach((menu: any) => {
          if (menu.menuRoute_Menu_Text.toUpperCase() === route.toUpperCase()) {
            if (operation === 'create') {
              operationAllowed = menu.menuAllowedOperations_Menu_Document.createOperationAllowed_Menu_Bool;
            } else if (operation === 'update') {
              operationAllowed = menu.menuAllowedOperations_Menu_Document.updateOperationAllowed_Menu_Bool;
            }
            return;
          }
        });
        if (operationAllowed) {
          return;
        }
      });
    });
    return operationAllowed;
  }

}