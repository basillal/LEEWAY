import { Component } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { InputConfig } from 'dist/libs/dynamic-form/lib/dynamic-form-config.model';
// If you built the library, you might use this import instead:
// import { InputConfig } from '@your-workspace/dynamic-form'; 

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  isEditMode = false;
  showModal = false;

  // Password-group validator factory (cross-field)
  matchPasswordsValidator(): ValidatorFn {
    return (group: AbstractControl) => {
      const pw = group.get('password')?.value;
      const cpw = group.get('confirmPassword')?.value;
      return pw === cpw ? null : { passwordMismatch: true };
    };
  }

  formFields: InputConfig[] = [
    { type: 'text', key: 'fullName', label: 'Full name', placeholder: 'John Doe', required: true, minLength: 3, wrapperClassName: 'col-span-1' },
    { type: 'number', key: 'age', label: 'Age', placeholder: '18', required: true, min: 0, max: 120, wrapperClassName: 'col-span-1' },
    { type: 'email', key: 'email', label: 'Email', placeholder: 'name@example.com', required: true, pattern: '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$', wrapperClassName: 'col-span-2' },
    { type: 'tel', key: 'phone', label: 'Phone', placeholder: '+1-555-555-5555', pattern: '^\\+?[0-9-\\s]{7,20}$', wrapperClassName: 'col-span-2' },
    {
      type: 'select',
      key: 'gender',
      label: 'Gender',
      placeholder: 'Select gender',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' }
      ],
      required: true,
      wrapperClassName: 'col-span-1'
    },
    { type: 'date', key: 'dob', label: 'Date of birth', required: true, wrapperClassName: 'col-span-2' },
    { type: 'checkbox', key: 'newsletter', label: 'Subscribe to newsletter', defaultValue: false, wrapperClassName: 'col-span-2' },
    {
      type: 'group',
      key: 'address',
      label: 'Address',
      wrapperClassName: 'col-span-4',
      fields: [
        { type: 'text', key: 'street', label: 'Street', required: true, wrapperClassName: 'col-span-2' },
        { type: 'text', key: 'city', label: 'City', required: true, wrapperClassName: 'col-span-1' },
        { type: 'text', key: 'zipcode', label: 'ZIP Code', pattern: '^[0-9]{4,10}$', wrapperClassName: 'col-span-1' }
      ]
    },
    {
      type: 'array',
      key: 'skills',
      label: 'Skills',
      wrapperClassName: 'col-span-4',
      minItems: 1,
      maxItems: 10,
      fields: [{ type: 'text', key: 'skill', label: 'Skill', required: true }]
    },
    {
      type: 'file',
      key: 'resume',
      label: 'Resume (PDF)',
      accept: '.pdf',
      maxFileSizeBytes: 5 * 1024 * 1024,
      wrapperClassName: 'col-span-2'
    },
    {
      type: 'group',
      key: 'passwordGroup',
      label: 'Password',
      wrapperClassName: 'col-span-4',
      validators: [() => this.matchPasswordsValidator()],
      fields: [
        { type: 'password', key: 'password', label: 'Password', required: true, minLength: 8, wrapperClassName: 'col-span-2' },
        { type: 'password', key: 'confirmPassword', label: 'Confirm password', required: true, wrapperClassName: 'col-span-2' }
      ]
    },
    { type: 'text', label: 'A', key: 'a', wrapperClassName: 'col-span-1', required: true },
    { type: 'text', label: 'B', key: 'b', wrapperClassName: 'col-span-1' },
    { type: 'text', label: 'C', key: 'c', wrapperClassName: 'col-span-1' },
    { type: 'text', label: 'D', key: 'd', wrapperClassName: 'col-span-1' },
    { type: 'text', label: 'E', key: 'e', wrapperClassName: 'col-span-1' },
    { type: 'text', label: 'F', key: 'f', wrapperClassName: 'col-span-1' },
    { type: 'text', label: 'G', key: 'g', wrapperClassName: 'col-span-1' },
    { type: 'text', label: 'H', key: 'h', wrapperClassName: 'col-span-1' },
    { type: 'text', label: 'I', key: 'i', wrapperClassName: 'col-span-1' },
    { type: 'text', label: 'J', key: 'j', wrapperClassName: 'col-span-1' }
  ];

  editData = {
    fullName: 'Alice Johnson',
    age: 32,
    email: 'alice@example.com',
    phone: '+1-555-0123',
    gender: 'female',
    dob: '1992-04-01',
    newsletter: true,
    address: { street: '10 Main St', city: 'Metropolis', zipcode: '12345' },
    skills: [{ skill: 'Angular' }],
    a: 'Value A',
    b: 'Value B'
  };

  handleFormSubmit(payload: any) {
    console.log('submitted:', payload);
    // Example: handle file upload when resume exists
    if (payload.resume && payload.resume.length) {
      const fd = new FormData();
      fd.append('resume', payload.resume[0]);
      fd.append('payload', JSON.stringify({ ...payload, resume: undefined }));
      // send fd to server...
    }
    this.showModal = false;
  }

  handleFormStatus(valid: boolean) {
    console.log('form valid?', valid);
  }

  openModal() { this.showModal = true; }
  closeModal() { this.showModal = false; }
}