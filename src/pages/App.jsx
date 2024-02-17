/**
 * This page manages route to pages
 */
import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import ExpiredPage from "./ExpiredPage";

export default class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact Component={MainPage}/>
            <Route path="/expired" Component={ExpiredPage}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
