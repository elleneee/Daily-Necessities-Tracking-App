/**
 * SearchBar class
 * This component is a search bar for user to select tag or input name to find items.
 */
import React, { Component } from "react";
import TagManager from "../models/TagManager";
import PropTypes from "prop-types";

export default class SearchBar extends Component {
  constructor(props){
    super(props);
    this.tags = new TagManager();
  }

  onSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("seachName");
    let tag = formData.get("searchTag");
    this.props.onSearchItem(name, tag);
    event.target.reset();
  };

  render() {
    return (
      <div>
        <form className="row g-2 d-flex justify-content-md-center m-3"
          onSubmit={this.onSearch}>
          <div className="col-md-2">
            <label htmlFor="seachName" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" name="seachName" id="seachName" />
          </div>
          <div className="col-md-2">
            <label htmlFor="SeachTag" className="form-label">
              Tag
            </label>
            <select name="searchTag" id="SeachTag" className="form-select">
              <option value={""}></option>
              {this.tags.tags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
          <div className="col-md-1 align-center p-3 ">
            <button type="submit" id="search-btn" className="btn btn-primary">
              Search
            </button>
          </div>
        </form>
      </div>
    );
  }
}
SearchBar.propTypes = {
  onSearchItem: PropTypes.func.isRequired,
};