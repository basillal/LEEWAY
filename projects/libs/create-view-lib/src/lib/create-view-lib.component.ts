import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-create-view-lib',
  templateUrl: './create-view-lib.component.html'
})
export class CreateViewLibComponent {
  @Input() title: string = 'Permission';
  isCreateView: boolean = false;

  openCreateView() {
    this.isCreateView = true;
  }

  closeCreateView() {
    this.isCreateView = false;
  }
}
