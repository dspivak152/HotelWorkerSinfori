import { Component } from '@angular/core';
import { InventoryTabsConsts } from './inventoryTabsConst';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  inventoryTabsConsts = InventoryTabsConsts;
  currentTab: string = this.inventoryTabsConsts.ROOMS_OVERVIEW;

  constructor() { }

  showSelectedTab(tab: string) {
    this.currentTab = tab
  }

}
