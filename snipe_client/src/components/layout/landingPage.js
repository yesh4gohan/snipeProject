import React, { Component } from "react";
import {Link} from "react-router-dom";
class landingPage extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Snipe Community</h1>
                <p className="lead">
                  {" "}
                  Welcome to Snipe community a place where you post, share and help fellow developers with any developer issues
                </p>
                <hr />
                <Link to = "/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
                <div>
                  <h4><b>Or Get started by posting your issue</b></h4>
                  <Link to="/userHomePage" className="btn btn-success">
                  Post
                </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default landingPage;
