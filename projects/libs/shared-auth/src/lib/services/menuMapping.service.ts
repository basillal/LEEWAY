import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuMappingService {
  private formattedNames: { [key: string]: string } = {
    "INTERVIEW MANAGER": "SIM",
    "ADMISSION": "Admission",
    "HR": "HR",
    "APPS": "Apps",
    "FEES": "Fees",
    "GYMNASIUM":"Gym",
    "EDUSERV":"EduServ"
    // Add more predefined mappings here if needed
  };

  constructor() {}

  setDynamicMappings(menuList: string[]) {
    menuList.forEach((menuName) => {
      if (!this.formattedNames[menuName.toUpperCase()]) {
        this.formattedNames[menuName.toUpperCase()] = this.toSentenceCase(menuName);
      }
    });
  }

  getFormattedMenuName(menuName: string): string {
    return this.formattedNames[menuName.toUpperCase()] || this.toSentenceCase(menuName);
  }

  getAllMappings(): { [key: string]: string } {
    return this.formattedNames;
  }

  private toSentenceCase(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}
