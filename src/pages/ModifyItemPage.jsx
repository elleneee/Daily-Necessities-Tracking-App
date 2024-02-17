/**
 * ModifyItemPage class
 * This page shows item info and will update item info after modified
 */
import React, { Component } from "react";
import TagManager from "../models/TagManager";
import moment from "moment";
import PropTypes from "prop-types";

export default class ModifyItemPage extends Component {
  constructor(props){
    super(props);
    this.period = ["Day", "Week", "Month", "Year"];
    this.tags = new TagManager();
  }

  // Modify event
  onModify = (event) => {
    event.preventDefault();
    // get inputs from form
    const formData = new FormData(event.target);
    const item = {
      id: this.props.item.id,
      name: formData.get("name"),
      quantity: formData.get("quantity"),
      expiration: formData.get("expiration"),
      tags: formData.getAll("tags"),
      period: formData.get("period"),
    };
    this.props.onModifyItem(item);
    // console.log("Modify item", item);
    alert("Modify sucessfully!");
  };

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary btn-sm me-3"
          data-bs-toggle="modal"
          data-bs-target={"#modifyModal"+this.props.item.id}
          data-bs-whatever="@mdo"
        >
          Modify
        </button>
        <div
          className="modal fade"
          id={"modifyModal"+this.props.item.id}
          tabIndex={-1}
          aria-labelledby="modifyModalLabel"
          aria-hidden="true"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="modifyModalLabel">
                  Item Info
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form action="/" onSubmit={this.onModify}>
                  <div className="mb-3">
                    <label htmlFor="item-name" className="col-form-label">
                      Name:
                    </label>
                    <input type="text" className="form-control" defaultValue={this.props.item.name} id="item-name" name="name" required/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="item-qty" className="col-form-label">
                      Quantity:
                    </label>
                    <input type="number" className="form-control" 
                      defaultValue={this.props.item.quantity} id="item-qty" name="quantity"/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="item-exp" className="col-form-label">
                      Expiration:
                    </label>
                    <input type="date" className="form-control" 
                      defaultValue={this.props.item.expiration} id="item-exp" name="expiration" 
                      min={moment().format("YYYY-MM-DD")}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="item-tags" className="col-form-label">
                      Tags:
                    </label>
                    {this.tags.tags.map((tag) => (
                      <div className="form-check" key={tag}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={tag}
                          name="tags"
                          value={tag}
                          defaultChecked={this.props.item.tags.includes(tag)}
                        />
                        <label className="form-check-label" htmlFor={tag}>
                          {tag}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="item-period" className="col-form-label me-3">
                      Reminder period:
                    </label>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic radio toggle button group"
                    >
                      {this.period.map((p) => (
                        <div key={p}>
                          <input
                            type="radio"
                            className="btn-check"
                            name="period"
                            id={this.props.item.id+p}
                            value={p}
                            autoComplete="off"
                            defaultChecked={p===this.props.item.period} 
                          />
                          <label className="btn btn-outline-primary" htmlFor={this.props.item.id+p}>
                            {p}
                          </label>
                        </div>
                      ))}
                    </div>

                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      cancle
                    </button>
                    <button type="submit"  className="btn btn-primary" data-bs-dismiss="modal">
                      comfirm
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ModifyItemPage.propTypes = {
  item: PropTypes.object.isRequired,
  onModifyItem: PropTypes.func.isRequired,
};