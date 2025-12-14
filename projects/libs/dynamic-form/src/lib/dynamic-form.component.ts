import {
  Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges,
  ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy
} from '@angular/core';
import {
  FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AsyncValidatorFn,
  FormArray, AbstractControl, FormGroup as NgFormGroup
} from '@angular/forms';
import { BehaviorSubject, Observable, from, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { InputConfig, Option } from './dynamic-form-config.model';

@Component({
  selector: 'lib-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() inputConfig: InputConfig[] = [];
  @Input() formData?: any;
  @Input() isEditMode = false;
  @Input() debounce = 200;
  @Input() submitButtonLabel = 'Submit';
  @Input() updateButtonLabel = 'Update';
  @Input() disableSubmitUntilValid = true;
  @Output() submitForm = new EventEmitter<any>();
  @Output() formStatus = new EventEmitter<boolean>();
  @Output() valueChanges = new EventEmitter<any>();
  @Output() formInvalidAttempt = new EventEmitter<void>();
  form!: FormGroup;
  visibility = new Map<string, boolean>();
  optionsStore = new Map<string, BehaviorSubject<Option[]>>();
  submitting = false;
  private destroy$ = new Subject<void>();

  private defaultErrorMessages: { [key: string]: (field: InputConfig) => string } = {
    required: f => `${f.label ?? f.key} is required.`,
    minlength: f => `${f.label ?? f.key} must be at least ${f.minLength} characters.`,
    maxlength: f => `${f.label ?? f.key} cannot be more than ${f.maxLength} characters.`,
    pattern: f => `${f.label ?? f.key} has invalid format.`,
    min: f => `${f.label ?? f.key} must be at least ${f.min}.`,
    max: f => `${f.label ?? f.key} must be less than ${f.max}.`,
    fileSize: f => `${f.label ?? f.key} exceeds the maximum allowed file size.`,
    minItems: f => `At least ${f.minItems} items required.`,
    maxItems: f => `No more than ${f.maxItems} items allowed.`,
    passwordMismatch: f => `Passwords do not match.`
  };

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputConfig'] && !changes['inputConfig'].isFirstChange()) {
      this.buildForm();
    }
    if (changes['formData'] && this.form && this.formData) {
      this.form.patchValue(this.formData, { emitEvent: false });
      this.cd.markForCheck();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private buildForm(): void {
    this.visibility.clear();
    this.optionsStore.clear();

    const group: { [key: string]: AbstractControl } = {};
    this.inputConfig.forEach(field => {
      group[field.key] = this.createControlForField(field);

      if ((field.type === 'select' || field.type === 'radio') && (field.options || field.asyncOptions)) {
        const subj = new BehaviorSubject<Option[]>(field.options ?? []);
        this.optionsStore.set(field.key, subj);
        if (field.asyncOptions) {
          const obs = field.asyncOptions instanceof Promise ? from(field.asyncOptions) : (field.asyncOptions as Observable<Option[]>);
          obs.pipe(takeUntil(this.destroy$)).subscribe(opts => subj.next(opts || []));
        }
      }
      this.visibility.set(field.key, this.evaluateVisibility(field));
    });

    this.form = this.fb.group(group);

    if (this.formData) this.form.patchValue(this.formData, { emitEvent: false });

    this.form.valueChanges
      .pipe(
        debounceTime(this.debounce),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        let changed = false;
        this.inputConfig.forEach(f => {
          const next = this.evaluateVisibility(f);
          if (this.visibility.get(f.key) !== next) {
            this.visibility.set(f.key, next);
            changed = true;
            if (!next) {
              const control = this.getControl(f.key);
              if (control) control.reset(f.defaultValue ?? null, { emitEvent: false });
            }
          }
        });
        if (changed) this.cd.markForCheck();
        this.formStatus.emit(this.form.valid);
        this.valueChanges.emit(this.form.value);
        this.cd.markForCheck();
      });

    this.formStatus.emit(this.form.valid);
    this.cd.markForCheck();
  }

  private createControlForField(field: InputConfig): AbstractControl {
    if (field.type === 'group') {
      const g: { [k: string]: AbstractControl } = {};
      (field.fields || []).forEach(f => {
        g[f.key] = this.createControlForField(f);
      });
      const group = this.fb.group(g, {
        validators: this.buildValidators(field),
        asyncValidators: this.buildAsyncValidators(field)
      } as any);
      if (field.defaultValue) group.patchValue(field.defaultValue, { emitEvent: false });
      if (field.disabled) group.disable({ emitEvent: false });
      return group;
    }
    if (field.type === 'array') {
      const arr: FormArray<AbstractControl> = this.fb.array<AbstractControl>([], {
        validators: this.buildValidators(field),
        asyncValidators: this.buildAsyncValidators(field)
      } as any);
      if (Array.isArray(field.defaultValue)) {
        field.defaultValue.forEach(itemValue => arr.push(this.createPrototypeForArray(field, itemValue)));
      } else if (typeof field.minItems === 'number' && field.minItems > 0) {
        for (let i = 0; i < field.minItems; i++) arr.push(this.createPrototypeForArray(field));
      }
      if (field.disabled) arr.disable({ emitEvent: false });
      return arr;
    }
    if (field.type === 'file') {
      const maxSize = typeof field.maxFileSizeBytes === 'number' ? field.maxFileSizeBytes : undefined;
      return new FormControl(
        { value: field.defaultValue ?? null, disabled: !!field.disabled },
        {
          validators: this.buildValidators(field, maxSize),
          asyncValidators: this.buildAsyncValidators(field),
          updateOn: 'change'
        } as any
      );
    }
    return new FormControl(
      { value: field.defaultValue ?? (field.type === 'checkbox' ? false : ''), disabled: !!field.disabled },
      {
        validators: this.buildValidators(field),
        asyncValidators: this.buildAsyncValidators(field),
        updateOn: 'change'
      } as any
    );
  }

  private createPrototypeForArray(field: InputConfig, value?: any): AbstractControl {
    if (!field.fields || field.fields.length === 0) {
      return new FormControl(value ?? null, this.buildValidators(field));
    }
    const g: { [k: string]: AbstractControl } = {};
    field.fields.forEach(f => {
      const copy = { ...f };
      if (value && value[f.key] !== undefined) copy.defaultValue = value[f.key];
      g[f.key] = this.createControlForField(copy);
    });
    return this.fb.group(g);
  }

  private buildValidators(field: InputConfig, capturedMaxFileSize?: number): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    if (field.required) validators.push(Validators.required);
    if (typeof field.minLength === 'number') validators.push(Validators.minLength(field.minLength!));
    if (typeof field.maxLength === 'number') validators.push(Validators.maxLength(field.maxLength!));
    if (field.pattern) validators.push(Validators.pattern(field.pattern));
    if (typeof field.min === 'number') validators.push(Validators.min(field.min!));
    if (typeof field.max === 'number') validators.push(Validators.max(field.max!));
    if (field.type === 'file' && typeof capturedMaxFileSize === 'number') {
      const max = capturedMaxFileSize;
      validators.push(control => {
        const f: any = control.value;
        if (!f) return null;
        const file = f instanceof FileList ? f[0] : f;
        if (file && file.size > max) return { fileSize: true };
        return null;
      });
    }
    if (field.type === 'array') {
      if (typeof field.minItems === 'number') {
        validators.push((c: AbstractControl) => (c instanceof FormArray && c.length < field.minItems!) ? { minItems: true } : null);
      }
      if (typeof field.maxItems === 'number') {
        validators.push((c: AbstractControl) => (c instanceof FormArray && c.length > field.maxItems!) ? { maxItems: true } : null);
      }
    }
    if (field.validators) {
      field.validators.forEach(v => {
        if (typeof v === 'function') {
          try {
            const maybe = (v as any)(field);
            if (typeof maybe === 'function') validators.push(maybe as ValidatorFn);
            else validators.push(v as ValidatorFn);
          } catch {
            validators.push(v as ValidatorFn);
          }
        }
      });
    }
    return validators;
  }

  private buildAsyncValidators(field: InputConfig): AsyncValidatorFn[] | null {
    const result: AsyncValidatorFn[] = [];
    if (field.asyncValidators) {
      field.asyncValidators.forEach(av => {
        if (typeof av === 'function') {
          try {
            const maybe = (av as any)(field);
            if (typeof maybe === 'function') result.push(maybe as AsyncValidatorFn);
            else result.push(av as AsyncValidatorFn);
          } catch {
            result.push(av as AsyncValidatorFn);
          }
        }
      });
    }
    return result.length ? result : null;
  }

  private evaluateVisibility(field: InputConfig): boolean {
    try {
      if (!field.showIf) return true;
      return !!field.showIf(this.form ? this.form.value : (this.formData ?? {}));
    } catch {
      return true;
    }
  }

  getOptions$(key: string): Observable<Option[]> {
    if (!this.optionsStore.has(key)) this.optionsStore.set(key, new BehaviorSubject<Option[]>([]));
    return this.optionsStore.get(key)!.asObservable();
  }
  trackByKey(_index: number, item: InputConfig) { return item.key; }
  shouldShow(field: InputConfig): boolean { return this.visibility.get(field.key) ?? true; }
  getControl(key: string): AbstractControl | null { return this.form ? this.form.get(key) : null; }
  isInvalid(key: string): boolean {
    const ctrl = this.getControl(key);
    return !!ctrl && ctrl.invalid && (ctrl.touched || ctrl.dirty);
  }
  getErrorMessage(field: InputConfig): string | null {
    const ctrl = this.getControl(field.key);
    if (!ctrl || !ctrl.errors) return null;
    for (const errKey of Object.keys(ctrl.errors)) {
      const msgKey = errKey === 'minlength' ? 'minlength' : errKey;
      if (field.errorMessages && field.errorMessages[msgKey]) return field.errorMessages[msgKey];
      if (this.defaultErrorMessages[msgKey]) return this.defaultErrorMessages[msgKey](field);
      return `${field.label ?? field.key} is invalid (${errKey}).`;
    }
    return null;
  }
  getFormArray(key: string): FormArray<AbstractControl> | null {
    const ctrl = this.getControl(key);
    return ctrl instanceof FormArray ? (ctrl as FormArray<AbstractControl>) : null;
  }
  isFormGroup(ctrl: AbstractControl | null | undefined): ctrl is NgFormGroup { return !!ctrl && ctrl instanceof NgFormGroup; }
  onSubmit() {
    if (this.submitting) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.formStatus.emit(false);
      this.formInvalidAttempt.emit();
      return;
    }
    this.submitting = true;
    this.formStatus.emit(true);
    const payload = this.form.getRawValue();
    this.submitForm.emit(payload);
    setTimeout(() => {
      this.submitting = false;
      this.cd.markForCheck();
    }, 300);
  }
  onReset() {
    this.inputConfig.forEach(f => {
      const ctrl = this.getControl(f.key);
      if (!ctrl) return;
      const def = f.defaultValue !== undefined ? f.defaultValue : (f.type === 'checkbox' ? false : null);
      ctrl.reset(def, { emitEvent: true });
      if (f.disabled) ctrl.disable({ emitEvent: false }); else ctrl.enable({ emitEvent: false });
    });
    this.formStatus.emit(this.form.valid);
    this.cd.markForCheck();
  }
  addArrayItem(fieldKey: string) {
    const arr = this.getFormArray(fieldKey);
    const field = this.inputConfig.find(f => f.key === fieldKey);
    if (!arr || !field) return;
    if (typeof field.maxItems === 'number' && arr.length >= field.maxItems) return;
    arr.push(this.createPrototypeForArray(field));
    this.cd.markForCheck();
  }
  removeArrayItem(fieldKey: string, index: number) {
    const arr = this.getFormArray(fieldKey);
    const field = this.inputConfig.find(f => f.key === fieldKey);
    if (!arr || !field) return;
    if (typeof field.minItems === 'number' && arr.length <= field.minItems) return;
    arr.removeAt(index);
    this.cd.markForCheck();
  }
  ariaInvalid(key: string) {
    const ctrl = this.getControl(key);
    return !!(ctrl && ctrl.invalid && (ctrl.touched || ctrl.dirty));
  }
  setOptions(key: string, options: Option[]) {
    if (!this.optionsStore.has(key)) this.optionsStore.set(key, new BehaviorSubject<Option[]>(options));
    else this.optionsStore.get(key)!.next(options);
    this.cd.markForCheck();
  }
  patchValue(value: any) {
    if (!this.form) return;
    this.form.patchValue(value);
    this.cd.markForCheck();
  }
}