import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface TabState {
  authToken?: string | null;
  menuState?: {
    selectedItem: any;
    menuName: string;
    policies: any;
  };
}


@Injectable({
  providedIn: 'root'
})
export class TabCommunicationService {
  private broadcastChannel: BroadcastChannel;
  private stateSubject = new BehaviorSubject<TabState | null>(null);

  constructor() {
    this.broadcastChannel = new BroadcastChannel('kjusys_tab_communication');
    // Listen for messages from other tabs
    // Listen for messages from other tabs
    this.broadcastChannel.onmessage = (event) => {
      const { type, data } = event.data;
      switch (type) {
        case 'STATE_UPDATE':
          this.stateSubject.next(data);
          break;
        case 'TAB_CLOSED':
          // Handle tab closure if needed
          break;
      }
    };
  }

  // Method to broadcast state changes
  broadcastState(state: TabState): void {
    this.broadcastChannel.postMessage({ 
      type: 'STATE_UPDATE', 
      data: state 
    });
  }

  // Get state updates
  getStateUpdates(): Observable<TabState | null> {
    return this.stateSubject.asObservable();
  }

  ngOnDestroy() {
    if (this.broadcastChannel) {
      this.broadcastChannel.close();
    }
  }

}
