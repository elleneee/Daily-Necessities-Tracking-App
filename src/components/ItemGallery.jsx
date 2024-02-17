/**
 * ItemGallery class
 * This component consists of multiple ItemView showing
 */
import React, { Component } from "react";
import ItemView from "./ItemView";
import PropTypes from "prop-types";

export default class ItemGallery extends Component {
  render() {
    return (
      <div className="row justify-content-center g-2">
        { this.props.items.map((item) => (
          <ItemView 
            key={item.id} 
            item={item} 
            isModify={this.props.isModify} 
            onRemoveItem={this.props.onRemoveItem} 
            onModifyItem={this.props.onModifyItem}/>
        )) }
      </div>
    );
  }
}
ItemGallery.propTypes = {
  items: PropTypes.array.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onModifyItem: PropTypes.func,
  isModify: PropTypes.bool,
};