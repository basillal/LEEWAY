import { Injectable, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpinnerStateService } from './spinner-state.service'; // Adjust the import path as necessary

@Injectable({
  providedIn: 'root'
})
export class SpinnerService implements OnDestroy {
  private routerEventsSubscription!: Subscription;
  private spinnerStateSubscription!: Subscription;
  private navigationInProgress = false;


  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private spinnerStateService: SpinnerStateService
  ) {
    this.setupRouterSpinnerHandling();
    this.subscribeToSpinnerState(); // Subscribe to SpinnerStateService changes
  }

  private setupRouterSpinnerHandling() {
    // Changed: Removed filter pipe and simplified subscription for performance
    // Original used filter with instanceof checks; now uses direct subscription
    this.routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (!this.navigationInProgress) {
          this.navigationInProgress = true;
          // Changed: Added console.log for debugging spinner timing
          //console.log('Spinner show triggered by NavigationStart:', event.url, new Date().toISOString());
          // Changed: Now uses spinnerStateService.show() instead of direct spinner.show()
          // This ensures consistency with SpinnerStateService’s counter logic
          this.spinnerStateService.show();
        }
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.navigationInProgress = false;
        // Changed: Added console.log for debugging spinner timing
        //console.log('Spinner hide triggered by NavigationEnd/Cancel/Error:', event.url, new Date().toISOString());
        // Changed: Now uses spinnerStateService.hide() instead of direct spinner.hide()
        this.spinnerStateService.hide();
      }
    });
  }

  private subscribeToSpinnerState() {
    // Changed: No significant logic change, but added console.log for debugging
    this.spinnerStateSubscription = this.spinnerStateService.spinnerState$.subscribe((show) => {
      //console.log('Spinner state changed:', show, new Date().toISOString());
      if (show) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }
  ngOnDestroy() {
    this.routerEventsSubscription?.unsubscribe();
    this.spinnerStateSubscription?.unsubscribe();
  }
}