import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  employeeCount: number = 0;
  employees: any[] = []; // This will store all employees
  displayedEmployees: any[] = []; // This will store filtered employees

  // Search and filter states
  departmentSearchTerm: string = '';
  currentAttendanceFilter: string[] = [];
  currentActiveFilter: string | null = null;
  selectedDepartments: { [key: string]: boolean } = {};
  
  // Dropdown visibility states
  showAttendanceDropdown = false;
  showActiveEmployeesDropdown = false;
  showDepartmentDropdown = false;

  attendanceFilters = [
    { label: 'Present', value: 'PRESENT', checked: false },
    { label: 'Absent', value: 'ABSENT', checked: false },
    { label: 'Leave', value: 'LEAVE', checked: false }
  ];

  activeFilters = [
    { label: 'Active', value: 'ACTIVE', checked: false },
    { label: 'Inactive', value: 'INACTIVE', checked: false }
  ];

  constructor() {}

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    // Mock data - Replace with API call
    this.employees = [
      { name: 'John Doe', email: 'john@example.com', empId: 1, department: 'IT', designation: 'Developer', attendance: 'PRESENT', status: 'ACTIVE' },
      { name: 'Jane Smith', email: 'jane@example.com', empId: 2, department: 'HR', designation: 'Manager', attendance: 'ABSENT', status: 'INACTIVE' }
    ];
    this.displayedEmployees = [...this.employees];
    this.employeeCount = this.employees.length;
  }

  searchEmployees(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.displayedEmployees = this.employees.filter(emp =>
      emp.name.toLowerCase().includes(query) ||
      emp.email.toLowerCase().includes(query) ||
      emp.department.toLowerCase().includes(query)
    );
  }

  toggleAttendanceDropdown() {
    this.showAttendanceDropdown = !this.showAttendanceDropdown;
  }

  toggleActiveEmployeesDropdown() {
    this.showActiveEmployeesDropdown = !this.showActiveEmployeesDropdown;
  }

  toggleDepartmentDropdown() {
    this.showDepartmentDropdown = !this.showDepartmentDropdown;
  }

  resetall() {
    this.currentAttendanceFilter = [];
    this.currentActiveFilter = null;
    this.selectedDepartments = {};
    this.displayedEmployees = [...this.employees];
  }

  resetAttendanceFilter() {
    this.currentAttendanceFilter = [];
    this.displayedEmployees = [...this.employees];
    this.showAttendanceDropdown = false;
  }

  toggleAttendanceFilter(filter: any) {
    filter.checked = !filter.checked;
    this.currentAttendanceFilter = this.attendanceFilters
      .filter(f => f.checked)
      .map(f => f.value);
    this.applyFilters();
  }

  toggleSelectAllAttendanceFilters() {
    const allSelected = this.attendanceFilters.every(f => f.checked);
    this.attendanceFilters.forEach(f => (f.checked = !allSelected));
    this.currentAttendanceFilter = allSelected ? [] : this.attendanceFilters.map(f => f.value);
    this.applyFilters();
  }

  resetActiveFilter() {
    this.currentActiveFilter = null;
    this.applyFilters();
    this.showActiveEmployeesDropdown = false;
  }

  applyActiveFilter(filter: any) {
    filter.checked = !filter.checked;
    this.currentActiveFilter = filter.checked ? filter.value : null;
    this.applyFilters();
  }

  toggleSelectAllActiveFilters() {
    const allSelected = this.activeFilters.every(f => f.checked);
    this.activeFilters.forEach(f => (f.checked = !allSelected));
    this.currentActiveFilter = allSelected ? null : this.activeFilters.map(f => f.value).join(',');
    this.applyFilters();
  }

  applyFilters() {
    this.displayedEmployees = this.employees.filter(emp => {
      const attendanceMatch = this.currentAttendanceFilter.length === 0 || this.currentAttendanceFilter.includes(emp.attendance);
      const activeMatch = !this.currentActiveFilter || emp.status === this.currentActiveFilter;
      const departmentMatch = Object.keys(this.selectedDepartments).length === 0 || this.selectedDepartments[emp.department];
      return attendanceMatch && activeMatch && departmentMatch;
    });
  }

  resetDepartmentFilter() {
    this.selectedDepartments = {};
    this.applyFilters();
    this.showDepartmentDropdown = false;
  }

  toggleSelectAll() {
    const allSelected = Object.keys(this.selectedDepartments).length > 0;
    this.selectedDepartments = allSelected ? {} : Object.fromEntries(this.employees.map(emp => [emp.department, true]));
    this.applyFilters();
  }

  applyDepartmentFilter() {
    this.applyFilters();
  }

  getFilteredDepartments() {
    return [...new Set(this.employees.map(emp => emp.department))]
      .filter(dept => dept.toLowerCase().includes(this.departmentSearchTerm.toLowerCase()));
  }

  getAttendanceFilterLabel(filters: string[]) {
    return filters.length > 0 ? `Attendance: ${filters.join(', ')}` : 'Filter by Attendance';
  }

  getActiveFilterLabel(filter: string | null) {
    return filter ? `Status: ${filter}` : 'Filter by Status';
  }

  getDepartmentFilterLabel(selectedDepartments: { [key: string]: boolean }) {
    const keys = Object.keys(selectedDepartments);
    return keys.length > 0 ? `Departments: ${keys.join(', ')}` : 'Filter by Department';
  }

  isDepartmentFilterApplied() {
    return Object.keys(this.selectedDepartments).length > 0;
  }

  getDepartmentCount(department: string) {
    return this.employees.filter(emp => emp.department === department).length;
  }

  navigateToOverview(email: string, empId: number) {
    console.log(`Navigating to Employee Overview: ${email}, ID: ${empId}`);
  }

}
