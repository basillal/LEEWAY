import { Component } from '@angular/core';
import { InputConfig } from '@libs/dynamic-form';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  isCreateView = false;
  isEdit = false;

  openCreateView() {
    this.isCreateView = true;
    this.isEdit = false;
  }

  closeCreateView() {
    this.isCreateView = false;
    this.isEdit = false;
  }

  handleCreate(data: any) {
    console.log('Create:', data);
    this.closeCreateView();
  }

  handleUpdate(data: any) {
    console.log('Update:', data);
    this.closeCreateView();
  }


  
  tableData =  [
    { id: 1, name: 'Alice Johnson', department: 'HR', salary: 50000, joiningDate: '2018-06-12', experience: 6, location: 'New York', status: 'Active', email: 'alice.johnson@example.com' },
    { id: 2, name: 'Bob Smith', department: 'IT', salary: 75000, joiningDate: '2015-09-23', experience: 9, location: 'San Francisco', status: 'Inactive', email: 'bob.smith@example.com' },
    { id: 3, name: 'Charlie Brown', department: 'Finance', salary: 62000, joiningDate: '2017-03-15', experience: 7, location: 'Los Angeles', status: 'Active', email: 'charlie.brown@example.com' },
    { id: 4, name: 'Diana Prince', department: 'Marketing', salary: 55000, joiningDate: '2019-11-08', experience: 4, location: 'Chicago', status: 'Active', email: 'diana.prince@example.com' },
    { id: 5, name: 'Ethan Hunt', department: 'Sales', salary: 67000, joiningDate: '2016-07-20', experience: 8, location: 'Boston', status: 'Inactive', email: 'ethan.hunt@example.com' },
    { id: 6, name: 'Fiona Gallagher', department: 'IT', salary: 78000, joiningDate: '2014-12-10', experience: 10, location: 'Seattle', status: 'Active', email: 'fiona.gallagher@example.com' },
    { id: 7, name: 'George Miller', department: 'Operations', salary: 59000, joiningDate: '2020-05-17', experience: 3, location: 'Houston', status: 'Active', email: 'george.miller@example.com' },
    { id: 8, name: 'Hannah Baker', department: 'HR', salary: 52000, joiningDate: '2019-09-25', experience: 5, location: 'Denver', status: 'Inactive', email: 'hannah.baker@example.com' },
    { id: 9, name: 'Ian Curtis', department: 'Support', salary: 48000, joiningDate: '2021-02-12', experience: 2, location: 'Phoenix', status: 'Active', email: 'ian.curtis@example.com' },
    { id: 10, name: 'Jessica Pearson', department: 'Legal', salary: 90000, joiningDate: '2013-06-30', experience: 11, location: 'Washington D.C.', status: 'Active', email: 'jessica.pearson@example.com' },
  ];
  
  columns = [
    { title: 'ID', key: 'id' ,sortable:true},
    { title: 'Name', key: 'name' ,sortable:true},
    { title: 'Department', key: 'department' ,sortable:true},
    { title: 'Salary', key: 'salary' },
    { title: 'Joining Date', key: 'joiningDate' },
    { title: 'Experience (Years)', key: 'experience' },
    { title: 'Location', key: 'location' },
    { title: 'Status', key: 'status' },
    { title: 'Email', key: 'email' },
  ];
  
  
  actionButtons = [
    {
      action: 'edit',
      tooltip: 'Edit',
      buttonClass: 'bg-green-100 hover:bg-green-400 text-green-800 font-medium  rounded transition duration-200',
      icon: '<i class="fas fa-plus"></i>' // FontAwesome Example
    },
    {
      action: 'delete',
      tooltip: 'Delete',
      buttonClass: 'bg-red-50 hover:bg-red-400 text-red-800 font-medium px-3 py-2 rounded transition duration-200',
      icon: '<i class="fas fa-trash"></i>'
    },
  
  ];
  
  
  handleAction(event: {action: string, item: any}) {
    const { action, item } = event;
    
    switch (action) {
      case 'edit':
        console.log('Edit item:', item);
        // Add your edit logic here
        break;
      case 'delete':
        console.log('Delete item:', item);
        // Add your delete logic here
        break;
      case 'view':
        console.log('View item:', item);
        // Add your view details logic here
        break;
    }
  }









  // inputFields: InputConfig[] = [
  //   { type: 'text', label: 'Text Box 1', placeholder: 'Enter Text 1', key: 'textBox1', className: 'w-full p-2' },
  //   { type: 'text', label: 'Text Box 2', placeholder: 'Enter Text 2', key: 'textBox2', className: 'w-full  col-span-3 ' },
  //   { type: 'password', label: 'Password', placeholder: 'Enter your password', key: 'textBox3', className: 'w-full p-2' },
  //   { type: 'checkbox', label: 'Accept Terms', key: 'checkbox1' },
  //   {
  //     type: 'select', label: 'Select Box', key: 'selectBox', options: [
  //       { label: 'Option 1', value: '1' },
  //       { label: 'Option 2', value: '2' }
  //     ], className: 'w-full p-2'
  //   },
  //   { type: 'text', label: 'Text Box 6', placeholder: 'Enter Text 6', key: 'textBox6', className: 'w-full p-2' },
  //   { type: 'text', label: 'Text Box 7', placeholder: 'Enter Text 7', key: 'textBox7', className: 'w-full p-2' },
  //   { type: 'text', label: 'Text Box 8', placeholder: 'Enter Text 7', key: 'textdBox7', className: 'w-full p-2' }

  // ];


  inputFields: InputConfig[] = [
    {
      type: 'text',
      label: 'Text Box 1',
      placeholder: 'Enter Text 1',
      key: 'textBox1',
      className: 'w-full p-2',
      wrapperClassName: 'col-span-1 sm:col-span-2'
    },
    {
      type: 'text',
      label: 'Text Box 2',
      placeholder: 'Enter Text 2',
      key: 'textBox2',
      className: 'w-full p-2',
      wrapperClassName: 'col-span-1 sm:col-span-3'
    },
    {
      type: 'password',
      label: 'Password',
      placeholder: 'Enter your password',
      key: 'textBox3',
      className: 'w-full p-2',
      wrapperClassName: 'col-span-1 sm:col-span-2'
    },
    {
      type: 'checkbox',
      label: 'Accept Terms',
      key: 'checkbox1',
      wrapperClassName: 'col-span-1 sm:col-span-4'
    },
    {
      type: 'select',
      label: 'Select Box',
      key: 'selectBox',
      options: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' }
      ],
      className: 'w-full p-2',
      wrapperClassName: 'col-span-1 sm:col-span-2'
    },
    {
      type: 'text',
      label: 'Text Box 6',
      placeholder: 'Enter Text 6',
      key: 'textBox6',
      className: 'w-full p-2',
      wrapperClassName: 'col-span-1 sm:col-span-2'
    },
    {
      type: 'text',
      label: 'Text Box 7',
      placeholder: 'Enter Text 7',
      key: 'textBox7',
      className: 'w-full p-2',
      wrapperClassName: 'col-span-1 sm:col-span-2'
    },
    {
      type: 'text',
      label: 'Text Box 8',
      placeholder: 'Enter Text 8',
      key: 'textBox8',
      className: 'w-full p-2',
      wrapperClassName: 'col-span-1 sm:col-span-2'
    }
  ];
  

  handleSubmit(formData: { [key: string]: any }) {
    console.log('Submitted Form Data:', formData);
  }

}
