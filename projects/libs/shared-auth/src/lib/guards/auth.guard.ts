import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authService.service';





@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private  router: Router, private authService:AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isAuthenticated = this.authService.checkUserHasPermissions(state.url);    
    if (isAuthenticated) {
      return true; 
    } else {
      alert("Sorry, you do not have permission to access this page")
      this.authService.removeCookies();
      return this.router.createUrlTree(['/login']); 
    }
    
  }

}

