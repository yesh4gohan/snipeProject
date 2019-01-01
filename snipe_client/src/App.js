import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/layout/navbar";
import LandingPage from "./components/layout/landingPage";
import Footer from "./components/layout/footer";
import Register from "./components/authorization/register";
import Login from "./components/authorization/login";
import {Provider} from "react-redux";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import store from "./store";
import UserHomePage from "./components/homePage/userHomePage";
import setAuthToken from './utils/setAuthToken';
import jwt_decode from "jwt-decode"
import {setCurrentUser,logoutUser} from "./actions/authActions"
import PrivateRoute from "./components/common/privateRoute";
// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    // store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

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
          <Route exact path = "/userHomePage" component = {UserHomePage}/>
          <Switch>
          {/* <PrivateRoute exact path = "/homePage" component = {HomePage}/> */}
          </Switch>
        </div>
        <Footer/>
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
