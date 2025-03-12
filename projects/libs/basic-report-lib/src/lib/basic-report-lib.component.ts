import { Component, EventEmitter, Input, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MultiDropdownLibComponent } from '@libs/multi-dropdown-lib';
/**
 * A reusable and customizable table report component with filtering, sorting, pagination, 
 * and export functionality.
 * 
 * Features:
 * - Configurable column headers with sorting
 * - Search functionality
 * - Multi-select dropdown filters for columns
 * - Pagination controls with dynamic page numbers
 * - Export data to Excel
 * - Custom action buttons for row-level interactions
 * 
 * Inputs:
 * - `data`: The list of data objects to be displayed in the table.
 * - `columns`: Defines the table columns with keys, titles, and optional sorting.
 * - `title`: The title of the table/report.
 * - `placeholderText`: Placeholder text for the search input.
 * - `pagination`: Enables/disables pagination.
 * - `itemsPerPage`: Number of items per page.
 * - `isSearchEnabled`: Enables/disables the search bar.
 * - `tableHeight`: Sets the maximum height of the table.
 * - `showActions`: Enables/disables the actions column.
 * - `actionButtons`: Configurable list of action buttons with icons, tooltips, and event identifiers.
 * - `enableExcelExport`: Enables/disables the Excel export functionality.
 * - `filterSession`: Enables/disables column filters and sorting.
 */
@Component({
  selector: 'lib-basic-report-lib',
  templateUrl: './basic-report-lib.component.html',
  styleUrls: ['./basic-report-lib.component.css']
})
export class BasicReportLibComponent {

  @Input() data: any[] = []; // Input data for the table
  @Input() columns: { title: string; key: string; sortable?: boolean }[] = []; // Column definitions with sorting option
  @Input() title = ""; // title for the page
  @Input() placeholderText: string = 'Items...'; // Default placeholder text
  @Input() pagination: boolean = true; // Enable/disable pagination
  @Input() itemsPerPage: number = 8; // Number of items per page
  @Input() isSearchEnabled: boolean = true; // Enable/disable search functionality
  @Input() tableHeight: string = '400px'; // Default height
  
  // New inputs for action buttons
  @Input() showActions: boolean = false; // Enable/disable actions column
  @Input() actionButtons: {
    icon: string; // HTML for the icon
    tooltip: string; // Tooltip text
    buttonClass: string; // CSS classes for the button
    action: string; // Identifier for the action
  }[] = [];  
  @Input() enableExcelExport: boolean = true; // Enable or disable Excel export

  @Input() filterSession:boolean = false; // columns filters and sorting
  @Input() filterColumns: string[] = []; // List of column keys to show filters for

  // Output event for action button clicks
  @Output() actionClick = new EventEmitter<{action: string, item: any}>();

  // search string
  searchTerm: string = '';

  // display data
  filteredData: any[] = []; // Data after applying search filter
  displayedItems: any[] = []; // Items to display on the current page
  currentPage: number = 1; // Current page number
  totalPages: number = 1; // Total number of pages

  
  sortedColumn: string = ''; // Instead of 'null'
  sortOrder: 'asc' | 'desc' = 'asc'; // Current sort order





  // trigger any changes happens in the data
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      console.log('Data received in component:', this.data);
      if (this.data && this.data.length > 0) {
        this.initializeFilters(); // Ensure filter options are set when data is received
      }
    }
    
    if (changes['data'] || changes['searchTerm'] || changes['isSearchEnabled']) {
      this.filterData();
      this.updateDisplayedItems();
    }
  }
  
  // Filter data based on the search term
  filterData(): void {
    let filtered = [...this.data]; // Start with original data
  
    // Apply Search Filtering
    if (this.isSearchEnabled && this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter((item) =>
        this.columns.some((column) => {
          const value = item[column.key]?.toString().toLowerCase();
          return value?.includes(searchTermLower);
        })
      );
    }
  
    // Apply Dropdown Filters
    Object.keys(this.selectedFilters).forEach((key) => {
      if (this.selectedFilters[key].length > 0) {
        filtered = filtered.filter((item) =>
          this.selectedFilters[key].includes(item[key])
        );
      }
    });
  
    // Apply Sorting if a column is selected
    if (this.sortedColumn) {
      filtered.sort((a, b) => {
        const valueA = a[this.sortedColumn];
        const valueB = b[this.sortedColumn];
  
        if (valueA < valueB) return this.sortOrder === 'asc' ? -1 : 1;
        if (valueA > valueB) return this.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }
  
    // Update the filtered data
    this.filteredData = filtered;
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    this.currentPage = 1; // Reset to the first page after filtering
    this.updateDisplayedItems();
  }
  
  
  // Handle action button clicks
  onActionClick(action: string, item: any): void {
    this.actionClick.emit({ action, item });
  }

  sortColumn(columnKey: string): void {
    if (this.sortedColumn === columnKey) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = columnKey;
      this.sortOrder = 'asc';
    }
    this.filterData(); // Reapply filtering and sorting
  }

  // Update displayed items based on the current page
  updateDisplayedItems(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedItems = this.filteredData.slice(startIndex, endIndex);
  }

  // Change the current page
  changePage(page: any): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updateDisplayedItems();
  }

  // Go to the previous page
  previousPage(): void {
    this.changePage(this.currentPage - 1);
  }

  // Go to the next page
  nextPage(): void {
    this.changePage(this.currentPage + 1);
  }

  // Get the range of pagination buttons
  getPaginationRange(): (number | string)[] {
    const range: (number | string)[] = [];
    const total = this.totalPages;
    const current = this.currentPage;
    const delta = 2; // Number of pages to show around the current page

    range.push(1);

    if (current - delta > 2) {
      range.push('...');
    }

    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
      range.push(i);
    }

    if (current + delta < total - 1) {
      range.push('...');
    }

    if (total > 1) {
      range.push(total);
    }
    return range;
  }


    // Export filtered or all data to Excel
    exportToExcel(exportAll: boolean = false): void {
      const exportData = exportAll ? this.data : this.filteredData;
  
      if (!exportData || exportData.length === 0) {
        alert('No data available for export.');
        return;
      }
  
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
  
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
      
      saveAs(data, `${this.title.replace(/\s+/g, '_')}_Report.xlsx`);
    }





// filter session  starts here

filterOptions: { [key: string]: any[] } = {}; // Stores unique values for filters
selectedFilters: { [key: string]: any } = {}; // Stores selected filter values

activeDropdown: string | null = null;

// initialize the filter with value

initializeFilters() {
  this.filterOptions = {}; // Reset filters
  if (!this.data || this.data.length === 0) return;
  this.columns.forEach((col) => {
    // Only initialize filters for columns that should be filtered
    if (this.shouldShowFilter(col.key)) {
      const uniqueValues = [...new Set(this.data.map((item) => item[col.key]))]; // Get unique values
      this.filterOptions[col.key] = uniqueValues.map((val) => ({
        label: val,
        value: val,
        checked: false
      }));
    }
  });
}



// Apply filters when a checkbox is clicked
// applyFilter(columnKey: string) {
//   this.selectedFilters[columnKey] = this.filterOptions[columnKey]
//     .filter((option) => option.checked)
//     .map((option) => option.value);

//   this.filterData();
// }


applyFilter(columnKey: string, selectedItems: any[]) {
  this.selectedFilters[columnKey] = selectedItems.map(item => item.value);
  this.filterData();
}

toggleDropdown(key: string) {
  this.activeDropdown = this.activeDropdown === key ? null : key;
}


@ViewChildren(MultiDropdownLibComponent) multiDropdownRefs!: QueryList<MultiDropdownLibComponent>;

resetFilters() {
  // Reset the search input (if applicable)
  this.searchTerm = ''; 

  // Reset all dropdowns
  if (this.multiDropdownRefs) {
    this.multiDropdownRefs.forEach((dropdown) => {
      dropdown.clearSelection(); // Ensure this method exists in your dropdown component
    });
  }

  // Loop through each filter category
  Object.keys(this.selectedFilters).forEach((key) => {
    // Clear selected filters
    this.selectedFilters[key] = [];

    // Reset filter options (uncheck all checkboxes)
    this.filterOptions[key].forEach((option) => {
      option.checked = false;
    });
  });

  // Reapply filtering with no filters
  this.filterData();
}



//filter session  end here


// Check if a column should have a filter
shouldShowFilter(columnKey: string): boolean {
  // If filterColumns is empty, show all filters
  // Otherwise, only show filters for columns in the filterColumns list
  return this.filterColumns.length === 0 || this.filterColumns.includes(columnKey);
}
}