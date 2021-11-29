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
  inventoryData: any[] = [];
  missingItems: any[] = [];
  missingItemsWithRooms: any[] = [];

  constructor(private inventoryService: InventoryService) { }

  showSelectedTab(tab: string) {
    this.currentTab = tab
  }

  ngOnInit() {
    this.getInventoryForHotel()
  }

  getInventoryForHotel() {
    this.inventoryService.getRoomsOverviewData().subscribe(result => {
      if (result != undefined) {
        this.hotelDevices = JSON.parse(JSON.stringify(result));
        this.inventoryData = JSON.parse(JSON.stringify(result));
        this.filterHotelDevices();
        this.setDataForInventoryView();
      }
    })
  }

  filterHotelDevices() {
    this.hotelDevices.forEach(device => {
      let missingProducts = device.products.filter(function (x: any) {
        return x.slotBoundToProduct && x.slotIsEmpty
      })
      device.missingProducts = missingProducts.map((x: any) => x.product.name);
    })
  }

  setDataForInventoryView() {
    this.inventoryData.forEach(device => {
      let missingProducts = device.products.filter(function (x: any) {
        return x.slotBoundToProduct && x.slotIsEmpty
      })
      missingProducts.forEach((product: any) => {
        if (this.missingItems.find(x => x.id == product.product.id) == undefined) {
          this.missingItems.push({ id: product.product.id, name: product.product.name })
        }
      });
    });
    this.inventoryData.forEach(room => {
      room.products.forEach((product: any) => {
        let foundProduct = this.missingItems.find(item => item.id === product.product.id);
        if (foundProduct && product.slotBoundToProduct && product.slotIsEmpty) {
          let foundExistingMissingItem = this.missingItemsWithRooms.find(x => x.productName == foundProduct.name);
          if (foundExistingMissingItem) {
            foundExistingMissingItem.rooms.indexOf(room.roomNumber) === -1 ? foundExistingMissingItem.rooms.push(room.roomNumber) : console.log("This item already exists");
          } else {
            this.missingItemsWithRooms.push({ productName: foundProduct.name, rooms: [room.roomNumber] })
          }
        }
      });
    })
    console.log(this.missingItemsWithRooms)

  }

}
