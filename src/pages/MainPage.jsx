import React, {Component} from "react";
import BasicTemplate from "../templates/BasicTemplate";
import SearchBar from "../components/SearchBar";
import ItemGallery from "../components/ItemGallery";
import NewItemPage from "./NewItemPage";
import ItemManager from "../models/ItemManager";

class MainPage extends Component {
  constructor(props){
    super(props);
    this.itemManager = new ItemManager();
    this.state = {
      items: [],
    };
  }

  // NewItemPage event, Add item
  onCreateItem = async (item) =>{
    await this.itemManager.addItem(item);
    await this.refreshitems();
  };

  // ItemView event, Remove item
  onRemoveItem = async (id) => {
    await this.itemManager.removeItem(id);
    await this.refreshitems();
  };

  // ItemView event, Modify item info
  onModifyItem = async (item) => {
    await this.itemManager.modifyItem(item);
    await this.refreshitems();
  };

  // SearchBar event, search items by name and tag
  onSearchItem = async (name, tag) => {
    this.setState({items: await this.itemManager.searchItems(name, tag)});
  };

  // Retreive data from db
  refreshitems = async () => {
    this.setState({items: await this.itemManager.getItems()});
  };

  async componentDidMount() {
    // console.log("MainPage.componentDidMount()", "Fetching items...");
    // Update items by period
    await this.itemManager.updateItems();
    await this.refreshitems();
  }

  render() {
    return (
      <div>
        <BasicTemplate/>
        <SearchBar onSearchItem={this.onSearchItem}/>
        <div className="d-flex justify-content-md-center">
          <NewItemPage id="newItemPage" onCreateItem={this.onCreateItem}/>
        </div>
        <div>
          <ItemGallery items={this.state.items} isModify={true} onRemoveItem={this.onRemoveItem} 
            onModifyItem={this.onModifyItem}/>
        </div>
      </div>
    );
  }
}

export default MainPage;
