/**
 * This component is a navigation bar
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <div className="mx-auto d-sm-flex d-block flex-sm-nowrap">
            <a className="navbar-brand" href="#">
              DailyTrack
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarsExample11"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse text-center" id="navbarsExample11">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Main
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/expired">
                    Expired
                  </Link>
                </li>
              </ul>
              {/* <button className="btn btn-outline-success" type="button" onClick={this.onNew}>New</button> */}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}


