import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { TokenStorageService } from '../services/token-storage.service';
import { InventoryTabsConsts } from './inventoryTabsConst';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  inventoryTabsConsts = InventoryTabsConsts;
  currentTab: string = this.inventoryTabsConsts.ROOMS_OVERVIEW;
  hotelDevices: any[] = [];
  devicesResult: any[] = [];

  constructor(private inventoryService: InventoryService) { }

  showSelectedTab(tab: string) {
    this.currentTab = tab
  }

  ngOnInit() {
    this.showInventoryForHotel()
  }

  showInventoryForHotel() {
    this.inventoryService.getRoomsOverviewData().subscribe(result => {
      if (result != undefined) {
        this.hotelDevices = result;
        this.filterHotelDevices();
      }
    })
  }

  filterHotelDevices() {
    this.hotelDevices.forEach(device => {
      let newArray = device.products.filter(function (x: any) {
        return x.slotBoundToProduct && x.slotIsEmpty
      })
      device.missingProducts = newArray.map((x: any) => x.product.name)
      device = newArray;
    })
  }

}
