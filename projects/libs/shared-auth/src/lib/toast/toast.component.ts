import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedToastService, ToastMessage } from './shared-toast.service';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container" *ngIf="toast">
      <!-- Main toast element -->
      <div
        [@toastTrigger]="'show'"
        [ngClass]="getToastClasses()"
        (click)="tapToDismiss()"
      >
        <div class="toast-content">
          <!-- Icon for the toast message -->
          <span class="toast-icon" [innerHTML]="getIcon()"></span>
          <!-- Message content -->
          <span class="toast-message">{{ toast.message }}</span>
          <!-- Close button for dismissing the toast -->
          <button class="toast-close" (click)="closeToast($event)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      /* Container for the toast notifications */
      .toast-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        max-width: 350px;
        z-index: 9999;
      }
      /* Base toast style */
      .toast {
        padding: 12px 20px;
        color: #fff;
        border-radius: 4px;
        display: flex;
        align-items: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      .toast-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }
      .toast-icon {
        margin-right: 12px;
        display: flex;
      }
      .toast-message {
        flex-grow: 1;
        font-size: 14px;
      }
      .toast-close {
        position: absolute;
        top: 5px;
        right: 5px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        color: #fff;
        opacity: 0.7;
        transition: opacity 0.2s;
        margin-left: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .toast-close svg {
        width: 16px;
        height: 16px;
        fill: none;
        stroke: white;
      }
      .toast-close:hover svg {
        stroke: #f1f5f9;
      }
      .toast-close:hover {
        opacity: 1;
      }
      /* Color classes for different toast types */
      .success {
        background-color: #16a34a;
      }
      .error {
        background-color: #dc2626;
      }
      .info {
        background-color: #2563eb;
      }
      .warning {
        background-color: #ca8a04;
      }
    `,
  ],
  animations: [
    trigger('toastTrigger', [
      state(
        'show',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate('300ms ease-out'),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'translateY(-100%)' })
        ),
      ]),
    ]),
  ],
})
export class ToastComponent implements OnInit, OnDestroy {
  toast: ToastMessage | null = null; // Current toast message
  private subscription!: Subscription; // Subscription to toast messages
  private autoCloseTimeout: any; // Timeout reference for auto-close

  constructor(
    private toastService: SharedToastService,
    private sanitizer: DomSanitizer, // DomSanitizer to bypass security checks for SVG icons
    private cdr: ChangeDetectorRef  
  ) {}

  ngOnInit() {
    // Subscribe to toast messages
    this.subscription = this.toastService.toast$.subscribe((toast) => {
      this.toast = toast;
      // Auto-close the toast after 5 seconds
      this.autoCloseTimeout = setTimeout(() => this.closeToast(), 5000);
    });
  }

  ngOnDestroy() {
    // Unsubscribe from the toast service when the component is destroyed
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Get the appropriate icon based on the toast type
  getIcon(): SafeHtml {
    if (!this.toast) return '';

    let iconHtml = '';
    switch (this.toast.type) {
      case 'success':
        iconHtml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="none" stroke="currentColor" stroke-width="2" d="M20 6L9 17l-5-5"/>
                    </svg>`;
        break;
      case 'error':
        iconHtml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>`;
        break;
      case 'info':
        iconHtml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                    </svg>`;
        break;
      case 'warning':
        iconHtml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                    </svg>`;
        break;
    }

    // Sanitize the SVG HTML to bypass Angular's security mechanisms
    return this.sanitizer.bypassSecurityTrustHtml(iconHtml);
  }

  // Close the toast manually or automatically after timeout
  closeToast(event?: MouseEvent):void {
    if (event) {
      event.stopPropagation(); // Prevent the event from triggering tapToDismiss()
    }
    
    this.toast = null; // Hide the toast
    clearTimeout(this.autoCloseTimeout); // Clear the auto-close timeout
    this.cdr.detectChanges();
    
  }

  // Close the toast when clicking anywhere on the toast (tap to dismiss)
  tapToDismiss() {
    this.closeToast();
  }

  // Get the appropriate CSS classes based on the toast type
  getToastClasses(): { [key: string]: boolean } {
    if (!this.toast) return {};
    return {
      toast: true,
      [this.toast.type]: true, // Apply the CSS class for the toast type (success, error, etc.)
    };
  }
}
