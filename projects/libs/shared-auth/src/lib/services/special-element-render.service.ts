import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecialElementRenderService {
  constructor() { }

  private menuData: any[] = [];

  // Public API
  checkSpecialElementPermission(specialButton: string): boolean {
    const rawRoute = window.location.hash
      ? window.location.hash.substring(1)
      : window.location.pathname; // fallback if you ever move away from hash
    const currentRoute = this.normalizeRoute(rawRoute);

    const storedData = localStorage.getItem('Routes');
    if (storedData) {
      try {
        this.menuData = JSON.parse(storedData);
      } catch (e) {
        console.error('Failed to parse Routes from localStorage:', e);
        return false;
      }
    }

    if (!Array.isArray(this.menuData)) {
      console.error('Expected menuData to be an array but received:', this.menuData);
      return false;
    }

    // Build route candidates:
    // 1) full route
    // 2) parent (remove last segment)
    // 3) top level (/kjusys)  -- If there are more segments, we progressively trim until only /kjusys remains.
    const routeCandidates = this.buildRouteFallbacks(currentRoute, '/kjusys');

    return this.checkOperationPermission(routeCandidates, specialButton);
  }

  // Create a list like:
  // /kjusys/eduserv/create
  // /kjusys/eduserv
  // /kjusys
  private buildRouteFallbacks(fullRoute: string, stopRoot: string): string[] {
    const candidates: string[] = [];
    let temp = fullRoute;

    // Avoid infinite loop; normalize stopRoot
    const normalizedStop = this.normalizeRoute(stopRoot);

    while (true) {
      candidates.push(temp);
      if (temp === normalizedStop) break;
      const lastSlash = temp.lastIndexOf('/');
      if (lastSlash <= 0) break; // reached root or cannot trim further
      temp = temp.substring(0, lastSlash);
      if (temp === '') {
        temp = '/';
      }
    }

    return candidates;
  }

  private checkOperationPermission(routeCandidates: string[], specialButton: string): boolean {
    // We want the FIRST (most specific) route that has the special button.
    // So iterate candidates in order; first positive match wins and we stop searching entirely.
    for (const candidate of routeCandidates) {
      const permission = this.findButtonPermissionOnExactRoute(candidate, specialButton);
      if (permission) {
        return true;
      }
    }
    return false;
  }

  // Scan menuData for an exact route match (after normalization) and then see if button exists.
  private findButtonPermissionOnExactRoute(candidateRoute: string, specialButton: string): boolean {
    const lcCandidate = this.normalizeRoute(candidateRoute);

    for (const document of this.menuData) {
      if (!document || typeof document !== 'object') continue;

      for (const [, group] of Object.entries<any>(document)) {
        if (!group || !Array.isArray(group.menus)) continue;

        for (const menu of group.menus) {
          if (!menu?.menuRoute_Menu_Text) continue;

          const normalizedMenuRoute = this.normalizeRoute(menu.menuRoute_Menu_Text);
          if (normalizedMenuRoute !== lcCandidate) continue;

          const allowedList: string[] | undefined = menu.menuAllowedPageElements_Menu_TextArray;
          if (Array.isArray(allowedList) && allowedList.includes(specialButton)) {
            return true; // found a matching route that allows the button
          }
          // else: keep scanning other menus with the same route
        }
      }
    }

    // No matching route had the button allowed
    return false;
  }

  private normalizeRoute(route: string): string {
    if (!route) return '/';
    let r = route.trim().toLowerCase();

    // Strip hash fragments or query (if any accidentally present in hash string)
    const qIndex = r.indexOf('?');
    if (qIndex >= 0) r = r.substring(0, qIndex);
    const hashIndex = r.indexOf('#');
    if (hashIndex >= 0) r = r.substring(0, hashIndex);

    // Ensure leading slash
    if (!r.startsWith('/')) r = '/' + r;

    // Remove trailing slash (except root)
    if (r.length > 1 && r.endsWith('/')) r = r.slice(0, -1);

    return r;
  }
}