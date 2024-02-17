/**
 * NewItemPage class
 * This page is for adding new item with name ,quantity, expiration, tags, and period
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import TagManager from "../models/TagManager";
import moment from "moment";

export default class NewItemPage extends Component {
  constructor(props){
    super(props);
    this.period = ["Day", "Week", "Month", "Year"];
    this.tags = new TagManager();
  }

  // Add new item
  onCreat = (event) => {
    event.preventDefault();
    // get inputs from form
    const formData = new FormData(event.target);
    const item = {
      name: formData.get("name"),
      quantity: formData.get("quantity"),
      expiration: formData.get("expiration"),
      tags: formData.getAll("tags"),
      period: formData.get("period"),
    };
    // console.log("comfirm item", item);
    this.props.onCreateItem(item);
    alert("Add sucessfully!");
    event.target.reset();
  };

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-3"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-bs-whatever="@mdo"
        >
          Add new item
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  New item
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form action="/" onSubmit={this.onCreat}>
                  <div className="mb-3">
                    <label htmlFor="item-name" className="col-form-label">
                      Name:
                    </label>
                    <input type="text" className="form-control" id="item-name" name="name" required/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="item-qty" className="col-form-label">
                      Quantity:
                    </label>
                    <input type="number" className="form-control" id="item-qty" name="quantity" defaultValue={1}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="item-exp" className="col-form-label">
                      Expiration:
                    </label>
                    <input type="date" className="form-control" id="item-exp" name="expiration" defaultValue={moment().format("YYYY-MM-DD")} min={moment().format("YYYY-MM-DD")}/>
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
                          defaultChecked={tag==="All"}
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
                            id={p}
                            value={p}
                            autoComplete="off"
                            defaultChecked={p==="Day"?"Checked":""} />
                          <label className="btn btn-outline-primary" htmlFor={p}>
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
NewItemPage.propTypes = {
  onCreateItem: PropTypes.func.isRequired,
};