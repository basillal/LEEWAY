import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[wizardStep]'
})
export class WizardStepDirective {
  stepIndex!: number;

  constructor(public templateRef: TemplateRef<any>) {}

  @Input('wizardStep')
  set wizardStep(value: string | number) {
    this.stepIndex = +value; // Convert to number always
  }
}
