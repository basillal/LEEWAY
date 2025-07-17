import { Component } from '@angular/core';
import { InputConfig } from '@libs/dynamic-form';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  stepColors = ['#f87171', '#fbbf24', '#34d399', '#60a5fa']; // red, yellow, green, blue
  currentStepIndex = 0;
  // Optional: use this if you want to go to the next step
  goToNextStep() {
    this.currentStepIndex++;
  }

  goToPreviousStep() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    }
  }

  layoutStyle: 'grid' | 'create' = 'grid';

openCreate() {
  this.layoutStyle = 'create';
}

backToGrid() {
  this.layoutStyle = 'grid';
}

  
}
