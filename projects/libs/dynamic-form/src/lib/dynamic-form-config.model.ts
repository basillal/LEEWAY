import { Observable } from 'rxjs';
import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';

export type Option = { label: string; value: any };
export type ShowIfFn = (formValue: any) => boolean;

export interface InputConfig {
  type:
    | 'text'
    | 'number'
    | 'password'
    | 'email'
    | 'date'
    | 'tel'
    | 'select'
    | 'checkbox'
    | 'textarea'
    | 'file'
    | 'radio'
    | 'group'
    | 'array';
  key: string;
  label?: string;
  placeholder?: string;
  className?: string;
  wrapperClassName?: string;
  tooltip?: string;
  hint?: string;
  defaultValue?: any;
  disabled?: boolean;
  showIf?: ShowIfFn;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  options?: Option[];
  asyncOptions?: Promise<Option[]> | Observable<Option[]>;
  multiple?: boolean;
  accept?: string;
  maxFileSizeBytes?: number;
  fields?: InputConfig[];
  minItems?: number;
  maxItems?: number;
  validators?: Array<ValidatorFn | ((cfg?: InputConfig) => ValidatorFn)>;
  asyncValidators?: Array<AsyncValidatorFn | ((cfg?: InputConfig) => AsyncValidatorFn)>;
  errorMessages?: { [validatorKey: string]: string };
  inputType?: string;
  [key: string]: any;
}