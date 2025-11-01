import { Inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom, Observable, Subscription, throwError } from 'rxjs';
import { catchError, map, take, tap, timeout } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { SpinnerStateService } from './spinner-state.service';


interface MenuPermissions {
  readOperationAllowed_Menu_Bool: boolean;
  createOperationAllowed_Menu_Bool: boolean;
  updateOperationAllowed_Menu_Bool: boolean;
}

interface MenuItem {
  menuDisplayName_Menu_Text: string;
  menuAllowedOperations_Menu_Document: MenuPermissions;
  menuRoute_Menu_Text: string;
  menuGroupName: string;
  menuExposedModule: string;
  menuNgModuleName: string;
}

interface MenuCategory {
  icon: string;
  menus: MenuItem[];
}

// interface MenuData {
//   [key: string]: MenuCategory;
// }

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private idleTimer: any;
  // private idleTimeoutDuration = 30 * 60 * 1000; // 30 minutes
  //private idleTimeoutDuration = 10000;

  // private warningTimer: any;
  // private idleWarningDuration = 1 * 60 * 1000;  //1 minute
  // private isWarningDisplayed = false;
  // private timersActive = false;

  private logoutSubscription: Subscription | null = null;
  private refreshAccessTokenSubscription: Subscription | null = null;


  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private spinnerStateService: SpinnerStateService,

    //private toastr: ToastrService,
    @Inject('env') public env: any,

  ) {
    this.checkLoginState();
    //console.log('Auth token in new tab (constructor):', this.getToken());
  }

  private checkLoginState(): void {
    const token = this.getToken();
    //console.log('Auth token in new tab (checkLoginState):', token);


    // if (token) {      
    //   this.setupIdleTimeout(); // Trigger idle timeout setup
    // }
  }

  getResponseData(response: any) {
    return response;
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    const data = {
      userEmail_AuthCommon_Text: credentials.username,
      userPassword_AuthCommon_Text: credentials.password,
    };

    return this.http.post(`${this.env.baseUrl}/authnauthz/authenticate`, data).pipe(
      take(1),
      map(this.getResponseData),
      tap((response: any) => {
        if (response.statusCode == 200 && response.type == "SUCCESS") {
          const responseData = response.responseData.data[0];
          this.updateTokens(responseData.accessToken, responseData.refreshToken);
          this.setCookies(responseData);
          // this.setupIdleTimeout();
        } else {
          return response;
        }
      }),
      catchError(this.handleErrors)
    );
  }

  logout(confirmed = true): void {
    // console.log(`Logout called with confirmed=${confirmed}`);  
    // if (confirmed || confirm('Are you sure you want to log out?')) {
      // this.clearIdleTimers();

      // this.spinnerService.showSpinner();
      this.spinnerStateService.show();  // Show spinner before the HTTP request

      const logoutTimeout = setTimeout(() => {
        this.handleLogoutError(new Error('Logout timeout'));
      }, 10000); // 10-second timeout


      this.logoutSubscription = this.http
        .post(
          `${this.env.baseUrl}/authnauthz/revoke-session-tokens`,
          { refreshToken_AuthCommon_Text: this.getRefreshToken() },
          { observe: 'response' }
        )
        .pipe(
          // Add timeout or catchError to ensure spinner is always hidden
          timeout(10000), // 10-second timeout
          catchError(error => {
            clearTimeout(logoutTimeout);
            this.handleLogoutError(error);
            return throwError(error);
          })
        )
        .subscribe({
          next: () => {
            clearTimeout(logoutTimeout);
            this.handleLogoutSuccess();
          },
          error: (error) => {
            clearTimeout(logoutTimeout);
            console.error('Logout error', error);
            this.handleLogoutError(error);
          },
          complete: () => {
            clearTimeout(logoutTimeout);
            // Ensure spinner is hidden in all cases
            //  this.spinnerService.hideSpinner();
            this.spinnerStateService.hide();
          }
        });
    // }
    
    // else {
    //   console.log('Logout canceled by user');
    // }
  }

  rolesdata:any = [];
private setCookies(responseData:any){
   this.rolesdata = responseData;
   localStorage.setItem('rolesdata', responseData.roles)
}



private clearCookies(){
  localStorage.removeItem('rolesdata');
}

  private handleLogoutSuccess(): void {
    this.spinnerStateService.hide(); // Ensure complete Reset
    this.clearAuthData();
    this.router.navigate([`/login`]);
  }
  private handleLogoutError(error: any): void {
    this.spinnerStateService.hide(); // Ensure complete reset
    this.clearAuthData();
    this.router.navigate([`/login`]);
  }

  private clearAuthData(): void {
    this.removeCookies();
    this.clearCookies();
    sessionStorage.clear();
    // clearTimeout(this.idleTimer);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  public getToken(): string | null {
    return this.cookieService.get(this.tokenKey);
  }

  public removeCookies(): void {
    this.cookieService.delete(this.tokenKey);
    this.cookieService.delete(this.refreshTokenKey);
    localStorage.removeItem('Routes');
  }

  private clearAllCookies(): void {
    const allCookies = this.cookieService.getAll();
    Object.keys(allCookies).forEach((cookie) =>
      this.cookieService.delete(cookie)
    );
  }

  private handleErrors(error: HttpErrorResponse): Observable<never> {
    const errorMessage =
      error.error instanceof ErrorEvent
        ? `Error: ${error.error.message}`
        : `Error Code: ${error.status}\nMessage: ${error.message}`;
    console.error(errorMessage);
    //this.toastr.error(errorMessage, 'Error');
    return throwError(() => new Error(errorMessage));
  }

  // public async showIdleAlert(): Promise<void> {
  //   if (this.isWarningDisplayed) return;

  //   this.isWarningDisplayed = true;

  //   const stayLoggedIn = confirm(`Your session will expire in ${this.idleWarningDuration / (60 * 1000)} minute. Do you want to stay logged in?`);

  //   if (stayLoggedIn) {
  //     // console.log('User chose to stay logged in.');
  //     this.resetIdleTimeout();
  //   } else {
  //     // console.log('User chose to log out.');
  //     this.logout(true);
  //   }

  //   // Reset warning display state after user responds
  //   this.isWarningDisplayed = false;
  // }


  // public resetIdleTimeout(): void {
  //   this.ngZone.run(() => {
  //     // Clear existing timers if any
  //     if (this.warningTimer || this.idleTimer) {
  //       this.clearIdleTimers();
  //       // console.log("Existing timers cleared.");
  //     }
  //     if (!this.router.url.includes('/login')) {
  //       const currentTimestamp = Date.now();
  //       // Set warning timer
  //       this.warningTimer = setTimeout(() => {
  //         if (!this.isWarningDisplayed) {
  //           this.showIdleAlert();
  //         }
  //       }, this.idleTimeoutDuration - this.idleWarningDuration);
  //       // Set idle timer for automatic logout
  //       this.idleTimer = setTimeout(() => {
  //         this.logout(true);
  //       }, this.idleTimeoutDuration);

  //       this.timersActive = true;
  //     }
  //   });
  // }
  // public boundResetTimeout = this.resetIdleTimeout.bind(this);

  // public setupIdleTimeout(): void {
  //   // ignore if login page
  //   if (this.router.url.includes('/login')) return;

  //   // Create a bound version of resetIdleTimeout
  //   const boundResetTimeout = this.resetIdleTimeout.bind(this);
  //   const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click'];
  //   // Remove existing listeners
  //   events.forEach(event => {
  //     window.removeEventListener(event, boundResetTimeout);
  //   });
  //   // Add new listeners
  //   events.forEach(event => {
  //     window.addEventListener(event, boundResetTimeout);
  //     // console.log(`Added listener for ${event}`);
  //   });
  //   // Initial setup of timers
  //   this.resetIdleTimeout();

  // }

  // public clearIdleTimers(): void {
  //   clearTimeout(this.idleTimer);
  //   clearTimeout(this.warningTimer);

  //   this.warningTimer = this.idleTimer = null;
  // }

  private base64UrlDecode(base64Url: string): string {
    // Replace non-url compatible chars with base64 standard chars
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // Pad with trailing '=' if needed
    const paddedBase64 = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      '='
    );
    // Decode the Base64 string
    return decodeURIComponent(
      atob(paddedBase64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
  }

  decodeJwt(
    token: any
  ): { header: any; payload: any; signature: string } | null {
    try {
      const [header, payload, signature] = token.split('.');
      if (!header || !payload) {
        throw new Error('Invalid JWT');
      }

      const decodedHeader = JSON.parse(this.base64UrlDecode(header));
      const decodedPayload = JSON.parse(this.base64UrlDecode(payload));

      return {
        header: decodedHeader,
        payload: decodedPayload,
        signature: signature,
      };
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }

  private tokenKey = 'auth-token';
  private refreshTokenKey = 'refresh-token';

  private setToken(token: string): void {
    this.cookieService.set(
      this.tokenKey,
      token,
      1,
      '/',
      undefined,
      false,
      'Strict'
    );
  }

  setMenus(key: string, value: any): void {
    this.cookieService.set(
      key,
      value,
      1,
      '/',
      undefined,
      false,
      'Strict'
    );
  }



  private setRefreshToken(refreshToken: string): void {
    this.cookieService.set(
      this.refreshTokenKey,
      refreshToken,
      1,
      '/',
      undefined,
      false,
      'Strict'
    );
  }

  private updateTokens(accessToken: string, refreshToken: string): void {
    this.setToken(accessToken);
    if (refreshToken !== '') {
      this.setRefreshToken(refreshToken);
    }
  }

  private getRefreshToken(): string | null {
    return this.cookieService.get(this.refreshTokenKey);
  }


  public async refreshAccessToken(): Promise<string> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const res: any = await firstValueFrom(
      this.http.post(
        `${this.env.baseUrl}/authnauthz/refresh-access-token`,
        { refreshToken_AuthCommon_Text: refreshToken },
        { withCredentials: true }
      )
    );

    if (res.statusCode !== 200 || res.type !== 'SUCCESS') {
      throw new Error(
        `Failed to refresh access token: ${res.responseData.message}`
      );
    }

    const newAccessToken = res.responseData.data[0].accessToken;
    this.updateTokens(newAccessToken, '');
    return newAccessToken;
  }

  ngOnDestroy(): void {
    // this.clearIdleTimers();
    // Remove all event listeners
    // ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click'].forEach(event => {
    //   window.removeEventListener(event, this.boundResetTimeout);
    // });
    // Unsubscribe from any ongoing subscriptions
    if (this.logoutSubscription) {
      this.logoutSubscription.unsubscribe();
    }
    if (this.refreshAccessTokenSubscription) {
      this.refreshAccessTokenSubscription.unsubscribe();
    }
  }


  fetchMenuDetails(): Observable<any> {
    const accessToken = this.cookieService.get(this.tokenKey);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  
    return this.http
      .get(`${this.env.baseUrl}/core/fetch-menu-mapped`, { headers })
      .pipe(
        take(1),
        map(this.getResponseData)
      );
  }
  


  checkUserHasPermissions(route: string) {
    if (route === '/kjusys') {
      if (localStorage.getItem("Routes") !== null) {
        return true;
      }
      return false;
    } else {
      const menuData = JSON.parse(localStorage.getItem("Routes") || '[]');
      try {
        for (const categoryKey in menuData[0]) {
          if (menuData[0].hasOwnProperty(categoryKey)) {
            const category: MenuCategory = menuData[0][categoryKey];

            const menus = category.menus;
            for (const menu of menus) {
              const routePath = menu.menuRoute_Menu_Text
              if (route.toLowerCase().includes(routePath.toLowerCase()) && menu.menuAllowedOperations_Menu_Document.readOperationAllowed_Menu_Bool) {
                return true;
              }
            }
          }
        }
        return false;
      } catch (error) {
        console.error(`Error checking permissions: ${error instanceof Error ? error.message : String(error)}`);
        return false;
      }
    }
  }



}
