import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';

export interface InputConfig {
  type: string; // 'text', 'number', 'select', 'checkbox', 'password', etc.
  label: string;
  key: string;
  placeholder?: string;
  className?: string; // for input/select styling
  wrapperClassName?: string; // for grid or layout styling
  options?: { label: string; value: string }[]; // for select

  required?: boolean; // whether the field is required
  showIf?: (formValue: any) => boolean; // conditionally show field
  disabled?: boolean; // disable input field
  defaultValue?: any; // initial value
  inputType?: string; // additional detail (ex: 'email', 'tel', etc.)
  tooltip?: string; // optional tooltip/helper text
  minLength?: number;
  maxLength?: number;
  pattern?: string; // regex pattern for validation
  min?: number; // min value (for numbers)
  max?: number; // max value (for numbers)
}

@Component({
  selector: 'lib-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  @Input() inputConfig: InputConfig[] = [];
  @Output() submitForm = new EventEmitter<any>();
  @Output() formStatus = new EventEmitter<boolean>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const controls: { [key: string]: any } = {};

    // Dynamically create form controls based on inputConfig
    this.inputConfig.forEach(field => {
      const validators: ValidatorFn[] = [];

      if (field.required) {
        validators.push(Validators.required);
      }

      if (field.minLength) {
        validators.push(Validators.minLength(field.minLength));
      }

      if (field.maxLength) {
        validators.push(Validators.maxLength(field.maxLength));
      }

      if (field.pattern) {
        validators.push(Validators.pattern(field.pattern));
      }

      if (field.min !== undefined) {
        validators.push(Validators.min(field.min));
      }

      if (field.max !== undefined) {
        validators.push(Validators.max(field.max));
      }

      controls[field.key] = [field.defaultValue || '', validators];
    });

    this.form = this.fb.group(controls);

    // Optional: react to value changes for dynamic field visibility
    this.form.valueChanges.subscribe(() => {
      this.formStatus.emit(this.form.valid);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
      this.formStatus.emit(false);
    }
  }

  onReset() {
    this.form.reset();
  }

  shouldShow(input: InputConfig): boolean {
    return !input.showIf || input.showIf(this.form.value);
  }

  // Get form control for error handling
  getControl(key: string) {
    return this.form.get(key);
  }
}
