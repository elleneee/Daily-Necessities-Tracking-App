/**
 * ItemManager class, manage the item list by calling DB functions, have search, add, remove, modify, update functions
 */
import myDBFirebase from "./myDBFirebase.js";

export default class ItemManager {
  
  constructor() {
    this.items = [];
    this.myDB = new myDBFirebase();
  }

  // Get items (not expired)
  async getItems() {
    return await this.myDB.getItems(">=");
  }

  // Update all items, check if their expiration need to update based on period 
  async updateItems() {
    await this.myDB.updateItems();
  }
  
  // Get items (not expired)
  async getExpiredItems() {
    return await this.myDB.getItems("<");
  }

  // Add item
  async addItem(item) {
    await this.myDB.addItem(item);
  }

  // Remove item by id
  async removeItem(id){
    await this.myDB.removeItem(id);
  }

  // Modify item
  async modifyItem(item) {
    await this.myDB.modifyItem(item);
  }

  // Search items (not expired) by name and tag
  async searchItems(name, tag) {
    return await this.myDB.searchItems(name, tag, ">=");
  }

  // Search items (expired) by name and tag
  async searchExpiredItems(name, tag) {
    return await this.myDB.searchItems(name, tag, "<");
  }
}