import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
 selector: 'lib-ag-grid-lib',
templateUrl: './ag-grid-lib.component.html',
styleUrls: ['./ag-grid-lib.component.css'],
})
export class AgGridLibComponent {
  @Input() rowData: any[] = [];
  @Input() columnDefs: ColDef[] = [];
  @Input() defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };
  @Input() gridOptions: any = {};
  @Input() pagination: boolean = true;
  @Input() buttonIcon: string = '🔍'; 

  // row button click
  @Output() rowButtonClick = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    this.addActionColumn(); 
  }

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();
  }

  addActionColumn() {
    const actionColumn = {
      headerName: 'Actions',
      field: 'action',
      cellRenderer: (params: any) => {
        const button = document.createElement('button');
        button.innerHTML = this.buttonIcon;
        button.style.cursor = 'pointer';
        button.addEventListener('click', () => {
          this.rowButtonClick.emit(params.data);
        });
        return button;
      },
      width: 100
    };

    this.columnDefs = [...this.columnDefs, actionColumn];
  }
}
