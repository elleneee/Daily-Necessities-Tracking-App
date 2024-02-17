/**
 * ExpiredPage class
 * This page shows expired items, and can search and remove items
 */
import React, { Component } from "react";
import BasicTemplate from "../templates/BasicTemplate";
import SearchBar from "../components/SearchBar";
import ItemGallery from "../components/ItemGallery";
import ItemManager from "../models/ItemManager";

export default class ExpiredPage extends Component {
  constructor(props) {
    super(props);
    this.itemManager = new ItemManager();
    this.state = {
      items: [],
    };
  }

  // Search items by name and tag
  onSearchItem = async (name, tag) => {
    this.setState({items: await this.itemManager.searchExpiredItems(name, tag)});
  };

  // Remove item by id
  onRemoveItem = async (id) => {
    await this.itemManager.removeItem(id);
    await this.refreshitems();
  };

  // Retreive data from db
  refreshitems = async () => {
    this.setState({items: await this.itemManager.getExpiredItems()});
    // console.log("Expired Page - Retrieve items", this.state.items);
  };

  // Get items from the beginning
  async componentDidMount() {
    console.log("ExpiredPage.componentDidMount()", "Fetching items...");
    await this.refreshitems();
  }

  render() {
    return (
      <div>
        <BasicTemplate />
        <SearchBar onSearchItem={this.onSearchItem}/>
        <ItemGallery 
          items={this.state.items} 
          isModify={false} 
          onRemoveItem={this.onRemoveItem}/>
      </div>
    );
  }
}
