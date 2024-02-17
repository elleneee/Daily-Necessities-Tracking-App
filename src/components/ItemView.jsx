/**
 * ItemView class
 * This component shows item info and handle remove item event.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import ModifyItemPage from "../pages/ModifyItemPage";

export default class ItemView extends Component {
  // Remove item event by id
  onRemove = (event) => {
    // console.log("ItemView onRemove", event.target.value);
    this.props.onRemoveItem(event.target.value);
  };

  render() {
    return (
      <div>
        <div className="row w-50 h-100 m-auto mb-3 bg-body-secondary border rounded ">
          <div className="col d-flex align-items-center justify-content-center">
            <span className="d-inline-block text-center">{this.props.item.name}</span>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <span className="d-inline-block text-center">Quantity: {this.props.item.quantity}</span>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <span className="d-inline-block text-center">{this.props.item.expiration}</span>
          </div>
          <div className="col pe-3 d-flex align-items-center justify-content-center">
            {this.props.isModify && <ModifyItemPage item={this.props.item} onModifyItem={this.props.onModifyItem}/>}
            <button type="button" onClick={this.onRemove} value={this.props.item.id} id="remove" className="btn btn-close btn-sm">
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ItemView.propTypes = {
  item: PropTypes.object.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onModifyItem: PropTypes.func,
  isModify: PropTypes.bool,
};