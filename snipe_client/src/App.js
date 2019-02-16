import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/layout/navbar";
import LandingPage from "./components/layout/landingPage";
import IssuesList from "./components/issues/issuesComponent";
import Footer from "./components/layout/footer";
import Register from "./components/authorization/register";
import Login from "./components/authorization/login";
import SingleIssue from "./components/issues/singleIssueComponent";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import UserHomePage from "./components/homePage/userHomePage";
import AdminPage from "./components/homePage/adminHomePage";
import EmployeePage from "./components/homePage/employeeHomePage";
import {connect} from 'react-redux'
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser,logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/common/privateRoute";
import AnswerComponent from './components/answer/answerComponent';
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
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <NavBar />
            <Route exact path="/" component={LandingPage} />
            <div className="container">
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/userHomePage" component={UserHomePage} />
                <Route exact path="/issuesList" component={IssuesList} />
                <Route exaxt path="/singleIssue" component={SingleIssue} />

                {this.props.auth.user.role === "admin" ? <PrivateRoute
                  exact
                  path="/adminHomePage"
                  component={AdminPage}
                />:null}

                {this.props.auth.user.role ==="employee" ? <PrivateRoute
                  exact
                  path="/employeeHomePage"
                  component={EmployeePage}
                />: null}
                <PrivateRoute
                  exact
                  path="/answerIssue"
                  component={AnswerComponent}
                />
                <Route render = {()=><h1>OOPs page not found!!!</h1>}/>
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
    );
  }
}

const mapStateToProps = state => ({
  auth:state.auth
});
const mapDispatchToProps = {

};
export default connect(mapStateToProps,mapDispatchToProps)(App);
