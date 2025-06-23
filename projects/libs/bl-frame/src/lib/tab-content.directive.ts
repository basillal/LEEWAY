import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tabContent]'
})
export class TabContentDirective {
  @Input('tabContent') tabName!: string;

  constructor(public templateRef: TemplateRef<any>) {}
}
