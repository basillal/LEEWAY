import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent {
  
  
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
}