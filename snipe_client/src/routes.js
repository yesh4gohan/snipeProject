import React from "react";
import IssuesList from "./components/issues/issuesComponent";
import Register from "./components/authorization/register";
import Login from "./components/authorization/login";
import SingleIssue from "./components/issues/singleIssueComponent";
import UserHomePage from "./components/homePage/userHomePage";
import AdminPage from "./components/homePage/adminHomePage";
import EmployeePage from "./components/homePage/employeeHomePage";
import PrivateRoute from "./components/common/privateRoute";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/layout/landingPage";
import NavBar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import "./App.css";

export default (
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

          <PrivateRoute exact path="/adminHomePage" component={AdminPage} />

          <PrivateRoute
            exact
            path="/employeeHomePage"
            component={EmployeePage}
          />
        </Switch>
      </div>
      <Footer />
    </div>
);
