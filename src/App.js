import React, { Component } from "react";
import "./App.css";
import Home from "./composants/home";
import NavBar from "./composants/navbar";
import Commentaires from "./composants/commentaires";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

class App extends Component {
  state = {};

  render() {
    return (
      <div className="container">
        <ToastContainer />
        <NavBar />
        <Route path="/commentaires" component={Commentaires} />
        <Route path="/" exact component={Home} />
      </div>
    );
  }
}

export default App;
