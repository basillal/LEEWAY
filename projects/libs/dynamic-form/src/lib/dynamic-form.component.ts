import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface InputConfig {
  type: string; // 'text', 'number', 'select', 'checkbox', 'password'
  label: string;
  placeholder?: string;
  key: string;
  className?: string;
  options?: { label: string; value: string }[];
  wrapperClassName?: string; // NEW: for wrapping div like col-span-2 etc.

}

@Component({
  selector: 'lib-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent {
  @Input() inputConfig: InputConfig[] = [];
  @Output() submitForm = new EventEmitter<{ [key: string]: any }>();

  formData: { [key: string]: any } = {};

  onSubmit() {
    this.submitForm.emit(this.formData);
  }
}
