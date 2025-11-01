
import {
  ChangeDetectionStrategy,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthGuard, AuthService, SpinnerService, SpinnerStateService } from '@libs/shared-auth';
import { filter, Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {

  private fullScreenRoutes = [
    '/kjusys/library/self-checkout',
    '/kjusys/library/check-in-check-out',
    '/kjusys/library/book-issue-cart',
    '/kjusys/library/book-issue',
    '/kjusys/library/book-return',
    '/kjusys/library/book-renew',
    '/kjusys/library/my-account',
    '/kjusys/library/response',
    '/kjusys/apps/queue-manager',
    '/kjusys/apps/queue-manager-display',
  ];

  sidebarWidth = '300px';
  isSidebarOpen = false;
  leftmenu$!: Observable<any>;
  currentUser: any;
  toggle = false;
  menus: any;
  rootRoute = '/kjusys';
  isFullScreen = false;
  showDefaultContent = false;
  isStandaloneMode = false;
  isStudent:boolean = false;

  constructor(
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private cookieService: CookieService, // Fixed: Renamed to match usage (was CookieService)
    private router: Router,
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private spinnerService: SpinnerService,
    private spinnerStateService: SpinnerStateService
  ) {}

  ngOnInit(): void {

   const rolesData = localStorage.getItem('rolesdata');
   this.isStudent = rolesData ? rolesData.split(',').includes('STUDENT') : false;
   
    const hashParams = window.location.hash.split('?')[1];
    if (hashParams) {
      const params = new URLSearchParams(hashParams);
      this.isStandaloneMode = params.get('standalone') === 'true';
    }

    const currentPath = window.location.hash.slice(1);
    this.showDefaultContent = currentPath === this.rootRoute;

    // Simplified: Safely parse localStorage with fallback
    this.menus = JSON.parse(localStorage.getItem('Routes') || '[]');
    this.leftmenu$ = of(
      Object.entries(this.menus[0] || {}) // Added fallback for menus[0]
        .filter(([key, value]) => key.trim() !== '' && value)
        .reduce((acc: { [key: string]: any }, [key, value]: [string, any]) => {
          acc[key.toLowerCase()] = {
            displayName: key.toUpperCase(),
            isOpen: false,
            isPinned: false,
            canActivate: [AuthGuard],
            icon: value.icon ? this.sanitizer.bypassSecurityTrustHtml(value.icon) : '',
            subModule: value.menus.map((item: any) => ({
              displayName: item.menuDisplayName_Menu_Text,
              subPath: item.menuRoute_Menu_Text.toLowerCase(),
              ngModuleName: item.menuNgModuleName_Menu_Text,
              pinned: false,
            })),
          };
          return acc;
        }, {})
    );

    // Spinner on navigation start (excluding root route)
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        if (event instanceof NavigationStart && event.url !== this.rootRoute) {
          this.spinnerStateService.show();
        }
      });

    // Navigation end handling (spinner, fullscreen, default content)
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.spinnerStateService.hide();
        // this.spinnerStateService.forceHide();
        this.showDefaultContent = event.urlAfterRedirects === this.rootRoute;

        if (this.fullScreenRoutes.includes(event.url)) {
          this.enterFullScreen();
        } else {
          // Fixed: Only call exitFullScreen if currently in fullscreen
          if (this.isFullScreen) {
            this.exitFullScreen();
          }
        }
        localStorage.setItem('currentRoute', event.urlAfterRedirects);
        this.cdr.detectChanges();
      });

    // Restore route on refresh
    const storedRoute = localStorage.getItem('currentRoute');
    if (storedRoute && storedRoute !== this.rootRoute && window.location.hash === '') {
      this.router.navigateByUrl(storedRoute);
    }
  }

   isMobileScreen(): boolean {
    return window.innerWidth < 640;
  }
  

  enterFullScreen(): void {
    const elem = document.documentElement as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void>;
      msRequestFullscreen?: () => Promise<void>;
    };

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
    this.isFullScreen = true;
  }

  exitFullScreen(): void {
    const doc = document as Document & {
      fullscreenElement?: Element;
      webkitFullscreenElement?: Element;
      msFullscreenElement?: Element;
      webkitExitFullscreen?: () => Promise<void>;
      msExitFullscreen?: () => Promise<void>;
    };

    // Fixed: Check if fullscreen is active before exiting to prevent TypeError
    const isFullscreenActive =
      doc.fullscreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement;
    if (isFullscreenActive) {
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
    }
    this.isFullScreen = false;
    this.cdr.detectChanges();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKeyPressed(event: KeyboardEvent): void {
    if (this.isFullScreen) {
      this.exitFullScreen();
    }
  }

  // ngAfterViewInit(): void {
  //   if (this.showDefaultContent) {
  //     setTimeout(() => this.animate(), 0);
  //   }
  // }

  // private animate(): void {
  //   const leftImage = document.querySelector<HTMLImageElement>('#left img');
  //   const rightImage = document.querySelector<HTMLImageElement>('#right img');
  //   const logoText = document.querySelector<HTMLHeadingElement>('#head h1');
  //   const paraSub = document.querySelector<HTMLParagraphElement>('#parasub p');
  //   const leftCard = document.querySelector<HTMLElement>('#card1');
  //   const middleCard = document.querySelector<HTMLElement>('#card2');
  //   const rightCard = document.querySelector<HTMLElement>('#card3');

  //   const timeline = gsap.timeline();
  //   timeline
  //     .from(leftImage, { y: 600, duration: 0.7, ease: 'power2.out' })
  //     .from(rightImage, { y: 600, duration: 0.7, ease: 'power2.out' }, '-=0.7')
  //     .to(logoText, { opacity: 1, duration: 0.7, scale: 1.2, ease: 'power2.inout' }, '-=0.5')
  //     .to(paraSub, { opacity: 1, duration: 0.7, scale: 1.1, ease: 'power2.inout' }, '-=0.7')
  //     .from(middleCard, { transform: 'translateZ(-100px) rotateX(90deg)', y: 300, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
  //     .from([rightCard, leftCard], { transform: 'translateZ(-100px) rotateX(45deg)', y: 600, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.5');
  // }

  menuToggle(): void {
    this.toggle = !this.toggle;
  }

  logout(): void {
    this.authService.logout();
  }
}