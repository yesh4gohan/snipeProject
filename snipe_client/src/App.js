import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/layout/navbar";
import LandingPage from "./components/layout/landingPage";
import Footer from "./components/layout/footer";
import Register from "./components/authorization/register";
import Login from "./components/authorization/login";
import {Provider} from "react-redux";
import {BrowserRouter as Router,Route} from "react-router-dom";
import store from "./store";
class App extends Component {
  render() {
    return (
      <Provider store = {store}>
      <Router>
      <div className="App">
        <NavBar />
        <Route exact path = "/" component = {LandingPage}/>
        <div className="container">
          <Route exact path = "/login" component = {Login}/>
          <Route exact path = "/register" component = {Register}/>
        </div>
        <Footer/>
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
