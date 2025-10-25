import { Component } from '@angular/core';
import { InputConfig } from '@libs/dynamic-form';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {


  layoutStyle: 'grid' | 'create' = 'grid';

openCreate() {
  this.layoutStyle = 'create';
}

backToGrid() {
  this.layoutStyle = 'grid';
}

  

}
