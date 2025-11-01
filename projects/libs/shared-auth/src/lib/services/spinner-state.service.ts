
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerStateService {
  private activeRequests = 0;
  private spinnerState = new BehaviorSubject<boolean>(false);
  spinnerState$ = this.spinnerState.asObservable();
  private timeoutId: any = null;
  private readonly TIMEOUT_DURATION = 10000; // 10 seconds

  show(): void {
    this.activeRequests++;
    this.spinnerState.next(true);

    // Reset any existing timeout
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    // Set a timeout to force-hide the spinner if it persists too long
    this.timeoutId = setTimeout(() => {
      this.forceHide();
    }, this.TIMEOUT_DURATION);
  }

  hide(): void {
    if (this.activeRequests > 0) {
      this.activeRequests--;
    }
    if (this.activeRequests === 0) {
      this.spinnerState.next(false);
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    }
  }

  forceHide(): void {
    this.activeRequests = 0; // Reset counter to avoid mismatch
    this.spinnerState.next(false);
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  reset(): void {
    this.activeRequests = 0;
    this.spinnerState.next(false);
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
