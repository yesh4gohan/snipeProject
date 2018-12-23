import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/layout/navbar";
import LandingPage from "./components/layout/landingPage";
import Footer from "./components/layout/footer"
class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <LandingPage/>
        <Footer/>
      </div>
    );
  }
}

export default App;
