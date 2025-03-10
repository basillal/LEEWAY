import { Component, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges } from '@angular/core';
/**
 * A reusable multi-select dropdown component with advanced features.
 * 
 * Features:
 * - Single or multi-selection mode
 * - Searchable dropdown with customizable placeholder
 * - Select All / Unselect All functionality
 * - Configurable dropdown height, item limits, and display options
 * - Supports custom text labels and remote data search
 * - Click outside to close functionality
 * - Option to limit the number of selections
 * - Dynamically updates based on external data changes
 * - Customizable styles using external CSS classes
 * - Displays a red asterisk (*) for required fields when `isRequired` is `true`
 * - Dynamically updates based on external data changes
 * 
 * Inputs:
 * - `data`: The list of items to be displayed in the dropdown.
 * - `selectedItems`: The list of preselected items.
 * - `singleSelection`: Enables single-selection mode when `true`.
 * - `idField`: The unique identifier field for each item.
 * - `textField`: The field to display as the label in the dropdown.
 * - `allowSearchFilter`: Enables search functionality within the dropdown.
 * - `searchPlaceholderText`: Placeholder text for the search input field.
 * - `enableCheckAll`: Allows selecting or unselecting all items at once.
 * - `selectAllText`: Text for the "Select All" button.
 * - `unSelectAllText`: Text for the "Unselect All" button.
 * - `itemsShowLimit`: Limits the number of items displayed at a time.
 * - `itemsSelectedShowLimit`: Limits the number of selected items shown in the UI.
 * - `maxHeight`: Maximum height of the dropdown.
 * - `closeDropDownOnSelection`: Closes dropdown upon selection when `true`.
 * - `clearSearchFilter`: Clears the search text after selection.
 * - `noDataAvailablePlaceholderText`: Placeholder text when no items are available.
 * - `allowRemoteDataSearch`: Enables remote search capability.
 * - `showClearButton`: Shows a button to clear all selections.
 * - `hideListByDefault`: Hides the item list by default until a search is performed.
 * - `maxSelectionLimit`: Limits the number of items that can be selected.
 * - `customClass`: Allows passing custom CSS classes to style the dropdown container.
 * - `isRequired`: If `true`, displays a red asterisk (`*`) next to the dropdown, indicating it is a required field.

 * 
 * Outputs:
 * - `selectionChange`: Emits the updated selected items list whenever selection changes.
 */
@Component({
  selector: 'lib-multi-dropdown-lib',
  templateUrl: './multi-dropdown-lib.component.html',
  styleUrls: ['./multi-dropdown-lib.component.css',]
})
export class MultiDropdownLibComponent {

  constructor(private eRef: ElementRef) { }


  @Input() singleSelection: boolean = false;
  @Input() idField: string = '_id';
  @Input() textField: string = '';
  @Input() selectAllText: string = 'Select All';
  @Input() unSelectAllText: string = 'Unselect All';
  @Input() itemsShowLimit: number | undefined;
  @Input() allowSearchFilter: boolean = true;
  @Input() enableCheckAll: boolean = true;
  @Input() maxHeight: number = 400;
  @Input() closeDropDownOnSelection: boolean = false;
  @Input() clearSearchFilter: boolean = true;
  @Input() searchPlaceholderText: string = 'Search...';
  @Input() noDataAvailablePlaceholderText: string = 'No items available';
  @Input() allowRemoteDataSearch: boolean = false;
  @Input() data: any[] = [];
  @Input() selectedItems: any[] = [];
  @Input() itemsSelectedShowLimit: number = 2;
  @Input() showClearButton: boolean = false;
  @Input() hideListByDefault: boolean = false;
  @Input() maxSelectionLimit: number | null = null;
  @Input() customClass: string = 'border border-gray-300 rounded-lg shadow-sm'; // Default class
  @Input() isRequired: boolean = false; // Whether to show a red asterisk





  @Output() selectionChange = new EventEmitter<any[]>();

  isDropdownOpen: boolean = false;
  searchText: string = '';

  // to handle the multiple multi dropdown in same component
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['selectedItems']) {
      this.selectedItems = this.data.filter(item =>
        this.selectedItems.some(selected => selected[this.idField] === item[this.idField])
      );
    }
  }

  /** ✅ Listen for clicks outside the component */
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  ngOnInit() {
    // ✅ Ensure selectedItems only contains valid selections from `data`
    this.selectedItems = this.data.filter(item =>
      this.selectedItems.some(selected => selected[this.idField] === item[this.idField])
    );
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }



  toggleSelection(item: any) {
    if (this.singleSelection) {
      if (this.selectedItems.length > 0 && this.selectedItems[0][this.idField] === item[this.idField]) {
        this.selectedItems = [];
      } else {
        this.selectedItems = [item];
      }
      this.emitSelection();

      // ✅ Close dropdown if single selection is enabled & dropdown close setting is true
      if (this.closeDropDownOnSelection) {
        this.isDropdownOpen = false;
      }
      return;
    }

    const index = this.selectedItems.findIndex(selected => selected[this.idField] === item[this.idField]);

    if (index > -1) {
      this.selectedItems.splice(index, 1);
    } else {
      if (this.maxSelectionLimit === null || this.selectedItems.length < this.maxSelectionLimit) {
        this.selectedItems.push(item);
      } else {
        console.warn(`Selection limit of ${this.maxSelectionLimit} reached`);
      }
    }
    this.emitSelection();

    // ✅ Close dropdown when selection reaches maxSelectionLimit
    if (this.closeDropDownOnSelection && this.maxSelectionLimit !== null && this.selectedItems.length >= this.maxSelectionLimit) {
      this.isDropdownOpen = false;
    }
  }



  isSelected(item: any): boolean {
    return this.selectedItems.some(selected => selected[this.idField] === item[this.idField]);
  }

  isAllSelected(): boolean {
    return this.selectedItems.length === this.data.length;
  }

  toggleSelectAll() {
    const filtered = this.filteredItems(); // Only consider visible (filtered) items

    if (filtered.every(item => this.isSelected(item))) {
      // If all filtered items are selected, remove them
      this.selectedItems = this.selectedItems.filter(
        selected => !filtered.some(item => item[this.idField] === selected[this.idField])
      );
    } else {
      // Otherwise, add only the filtered items
      filtered.forEach(item => {
        if (!this.isSelected(item)) {
          this.selectedItems.push(item);
        }
      });
    }
    this.emitSelection();
  }



  // filter items
  filteredItems(): any[] {
    if (this.hideListByDefault && !this.searchText) {
      return [];
    }
  
    let filtered = this.data;
  
    if (this.allowSearchFilter && this.searchText) {
      const searchLower = this.searchText.toLowerCase();
      
      filtered = filtered.filter(item => {
        const fieldValue = item[this.textField];
  
        // Handle numbers and text separately
        if (typeof fieldValue === 'string') {
          return fieldValue.toLowerCase().includes(searchLower);
        } else if (typeof fieldValue === 'number') {
          return fieldValue.toString().includes(this.searchText);
        }
  
        return false; // Exclude undefined/null values
      });
    }
  
    return filtered.slice(0, this.itemsShowLimit); // ✅ Limit displayed items
  }
  



  removeItem(item: any, event: Event) {
    event.stopPropagation(); // Prevent dropdown from opening
    this.selectedItems = this.selectedItems.filter(selected => selected[this.idField] !== item[this.idField]);
    this.emitSelection();
  }

  private emitSelection() {
    this.selectionChange.emit(this.selectedItems);
  }


  // clear the selection
  clearSelection() {
    this.selectedItems = [];
    this.searchText = ''; // Clear the search text
    this.emitSelection();
  }
}