import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LeftMenuLibService } from './left-menu-lib.service';
import { TabCommunicationService } from './tab-communication.service';
import { HamburgerService, MenuMappingService, SidebarService } from '@libs/shared-auth';


@Component({
  selector: 'lib-left-menu-lib',
  templateUrl: './left-menu-lib.component.html',
  styleUrls: ['./left-menu-lib.component.css'],
})
export class LeftMenuLibComponent implements OnInit, AfterViewInit, OnDestroy {
  leftMenuItems = [];
  routesForNewTab: string[] = [];

  id!: string | null;
  @Output() menuToggle = new EventEmitter<void>();
  @Output() menuItemClicked = new EventEmitter<string>();
  @Input() leftMenuObject: any;

  pinButton: boolean = false;
  toggle: boolean = false;
  pinIndex!: number;
  stateOfButton!: boolean[];
  breadcrumb: any = [];
  submenu: any = [];
  menuName: any = '';

  bannerData: any = '';
  leftMenu: any;
  filteredMenu: any[] = [];
  banner$ = new Subscription();
  intervalId: any;
  timeDate: Date = new Date();
  stateData!: any;
  dropdownOpen = false;
  sidebarWidth: string = '200px';
  isSidebarOpen: boolean = false;
  togglesearch: boolean = true;
  searchTerm: string = '';
  togglemenuflag: boolean = false;
  openSidebarMob: boolean = false;
  currentMenu: any = null;
  broadcastChannel: any;
  isStandaloneMode = false;
  iconbg: boolean = false;
  toggleMobSub: boolean = false;
  openMenus: { [key: string]: boolean } = {};
  openMenus$ = new BehaviorSubject<{ [key: string]: boolean }>({});

  formattedMenuNames: { [key: string]: string } = {};

  private subscription!: Subscription;
  constructor(
    private router: Router,
    public leftMenuLibService: LeftMenuLibService,
    public cdRef: ChangeDetectorRef,
    private tabCommunicationService: TabCommunicationService,
    private hamburger: HamburgerService,
    private sidebarClose: SidebarService,
    private eRef: ElementRef,
    private menuMappingService: MenuMappingService
  ) {}

  isNewTabRoute(route: string): boolean {
    return this.routesForNewTab.includes(route);
  }

  navigateTo(path: string): void {
    if (!this.isNewTabRoute(path)) {
      this.router.navigate([path]);
    }
  }

  ngOnInit(): void {
    this.sidebarClose.sidebarState$.subscribe((state:any) => {
      this.openSidebarMob = state;
    });
    this.subscription = this.hamburger.sidebarOpen$.subscribe(
      (isOpen:any) => {
        this.openSidebarMob = isOpen;
        if (!isOpen) {
          this.openMenus = {};
        }
      }
    );
    const hashParams = window.location.hash.split('?')[1];
    if (hashParams) {
      const params = new URLSearchParams(hashParams);
      this.isStandaloneMode = params.get('standalone') === 'true';
    }
    if (this.isStandaloneMode) {
      this.sidebarWidth = '0px';
      this.isSidebarOpen = false;
    }
    this.cdRef.detectChanges();
    this.stateData = history;
    this.leftMenu = Object.values(this.leftMenuObject);
    this.filteredMenu = this.leftMenu;
    this.getCurrentSavedMenu();

    const menuNames: string[] = this.leftMenu.map((menu: { displayName: string }) => menu.displayName);
    const uniqueMenuNames: string[] = Array.from(new Set(menuNames));
    this.menuMappingService.setDynamicMappings(uniqueMenuNames);
    this.formattedMenuNames = this.menuMappingService.getAllMappings();

    const filteredData: any = Object.values(this.leftMenu).filter(
      (obj: any) => {
        return (
          this.toSentenceCase(obj.displayName) ===
          this.toSentenceCase(this.leftMenuLibService.breadcrumbs?.data?.breadcrumb?.module)
        );
      }
    );
    const data = filteredData[0]?.subModule.filter((module: any) => {
      return (
        this.toSentenceCase(module.displayName) ===
        this.toSentenceCase(this.leftMenuLibService.breadcrumbs?.data?.breadcrumb?.subModule)
      );
    });
    this.menuName = this.toSentenceCase(this.leftMenuLibService.breadcrumbs?.data?.breadcrumb?.subModule);
    this.intervalId = setInterval(() => {
      this.timeDate = new Date();
    }, 1000);
    const toggleSidebar = document.querySelector('.toggle-side-bar');
    const sideBar = document.querySelector('.side-bar');
    const divider = document.querySelectorAll('.side-bar.divider');
    toggleSidebar?.addEventListener('click', function (e) {
      e.preventDefault();
      sideBar?.classList.toggle('hide');
    });
    this.cdRef.detectChanges();
    if (window.opener) {
      this.tabCommunicationService.getStateUpdates()
        .subscribe(state => {
          if (state?.menuState) {
            this.leftMenuLibService.policies = state.menuState.policies;
            this.menuName = this.toSentenceCase(state.menuState.menuName);
          }
        });
    }
  }

  getFormattedMenuName(menuName: string): string {
    const formattedNames: { [key: string]: string } = {
      "INTERVIEW MANAGER": "SIM",
      "ADMISSION": "Admission",
      "HR": "HR",
      "APPS": "Apps",
      "FEES": "Fees",
      "MY PROFILE": "My Profile"
    };
    return formattedNames[menuName.toUpperCase()] || this.toSentenceCase(menuName);
  }

  public toSentenceCase(text: string): string {
    if (!text) return '';
    return text.split(' ')
      .map(word => {
        if (!word) return '';
        if (word.length === 2) {
          return word.toUpperCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  }

  ngAfterViewInit() {
    this.banner$ = this.leftMenuLibService.leftMenuSubBanner$.subscribe(
      (res: any) => {
        this.bannerData = res;
      }
    );
  }

  onClick(): void {
    this.menuToggle.emit();
  }

  getCurrentSavedMenu(){
    const savedMenu = this.sidebarClose.getCurrentSidebarMenu();
    if (savedMenu) {
      this.toggleMenu(savedMenu);
    }
  }

  mainMenuClick() {
    this.toggle = !this.toggle;
  }

  menuItemClick(item: any, menu: any) {
    this.leftMenuLibService.policies = item;
    this.menuName = item.displayName;
    const currentRoute = this.router.url.split('?')[0];
    if (currentRoute === `${item.subPath}`) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([item.subPath]);
        this.cdRef.detectChanges();
      });
    } else if (this.isNewTabRoute(item.subPath)) {
      const originalState = {
        policies: this.leftMenuLibService.policies,
        menuName: this.menuName
      };
      const baseHref = document.querySelector('base')?.getAttribute('href') || '/';
      const fullUrl = `${window.location.origin}${baseHref}#${item.subPath}?standalone=true`;
      window.open(fullUrl, '_blank');
    }
    this.cdRef.detectChanges();
  }

  togglePin(menu: any) {
    menu.isPinned = !menu.isPinned;
    if (menu.isPinned) {
      menu.isOpen = true;
    }
  }

  changeState(event: Event, index: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  logout() {
    this.router.navigateByUrl('/login');
  }

  shownav: string = '0px';
  isSubMenuVisible: boolean = false;
  isSubMenuVisible2: boolean = false;
  showSubMenu(): void {
    this.isSubMenuVisible = !this.isSubMenuVisible;
  }

  sidebarIsShrunk: boolean = false;
  toggleSidebarNew: boolean = false;
  currentSelectedMenu: any = null;
  isSidebarToggled: boolean = false;

  toggleMenu(menu: any) {
    this.iconbg = true;
    if (this.currentSelectedMenu === menu && this.isSidebarToggled) {
      this.toggleSidebarNew = false;
      this.isSidebarToggled = false;
      this.currentSelectedMenu = null;
      this.filteredMenu = this.leftMenu;
    } else {
      this.toggleSidebarNew = true;
      this.isSidebarToggled = true;
      this.currentSelectedMenu = menu;
      this.filteredMenu = [menu];
      this.sidebarClose.saveSidebarMenu(menu);
      this.cdRef.detectChanges();
    }
  }

  closeSidebar() {
    this.isSidebarToggled = false;
    this.currentSelectedMenu = null;
    this.filteredMenu = this.leftMenu;
  }

  opensubmob(menuId: string) {
    const isCurrentlyOpen = this.openMenus[menuId];
    this.openMenus = {};
    if (!isCurrentlyOpen) {
      this.openMenus[menuId] = true;
    }
    this.openMenus$.next(this.openMenus);
  }

  isMenuOpen(menuId: string): boolean {
    return !!this.openMenus[menuId];
  }

  toggleHamburger() {
    if (this.sidebarClose.getSidebarState()) {
      this.sidebarClose.closeSidebar();
    } else {
      this.sidebarClose.openSidebar();
      this.openMenus = {};
    }
    this.cdRef.detectChanges();
  }

  closeMobSidebar() {
    this.sidebarClose.closeSidebar();
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (
      this.sidebarClose.getSidebarState() &&
      this.eRef.nativeElement && !this.eRef.nativeElement.contains(event.target)
    ) {
      this.sidebarClose.closeSidebar();
      this.openMenus = {};
      this.cdRef.detectChanges();
    }
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.filteredMenu = this.currentSelectedMenu ? [this.currentSelectedMenu] : this.leftMenu;
      return;
    }
    const menuToSearch = this.currentSelectedMenu ? [this.currentSelectedMenu] : this.leftMenu;
    this.filteredMenu = menuToSearch.reduce((acc: any[], menu: any) => {
      const matchedSubModules = menu.subModule.filter((subModule: any) =>
        subModule.displayName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      );
      if (matchedSubModules.length > 0) {
        acc.push({
          ...menu,
          subModule: matchedSubModules
        });
      }
      return acc;
    }, []);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.banner$) {
      this.banner$.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.openMenus$) {
      this.openMenus$.unsubscribe();
    }
  }

  navigateToHome() {
    this.router.navigate(['/kjusys']).then(() => {
      window.location.reload();
    });
  }

  isActive(subPath: string): boolean {
    return this.router.url.includes(subPath);
  }
}