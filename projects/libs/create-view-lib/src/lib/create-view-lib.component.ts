import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lib-create-view-lib',
  templateUrl: './create-view-lib.component.html'
})
export class CreateViewLibComponent {
  @Input() title: string = 'Permission';
  @Input() isCreateView: boolean = false; // <-- Now bound from parent

  @Output() closeView = new EventEmitter<void>(); // Optional for child-to-parent communication

  openCreateView() {
    this.isCreateView = true;
  }

  closeCreateView() {
    this.isCreateView = false;
    this.closeView.emit(); // Inform parent (optional)
  }
}
