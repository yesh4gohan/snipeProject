import React, { Component } from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import {withRouter} from "react-router-dom";
import SearchBar from "../searchBar/searchBar";
class NavBar extends Component {
  logout = async () => {
    await this.props.logoutUser();
    this.props.history.push("/login");
  }
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to = "/">
            Snipe Community
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            
          <SearchBar/>
            {!this.props.auth.isAuthenticated?<ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>:<button className = "btn btn-danger" onClick = {this.logout}>Logout</button>}
          </div>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => ({
  auth:state.auth
});
const mapDispatchToProps = {
  logoutUser
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NavBar));
