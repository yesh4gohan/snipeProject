import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classnames from 'classnames';

import { loginUser, getCurrentUserDetails } from "../../actions/authActions";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors:{}
    };
  }
  onSubmit = async e => {
    
    e.preventDefault();
    let { email, password } = this.state;
    let userObject = {
      email,
      password
    };
    await this.props.loginUser(userObject, this.props.history);
    console.log(this.state.errors)
  }

  componentWillReceiveProps(nextProps, prevState) {
    console.log("hi")
    if (Object.keys(nextProps.errors).length) {
      console.log(Object.keys(nextProps.errors).length)
      this.setState({errors:nextProps.errors})
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your existing account
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': this.state.errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {this.state.errors.email && <div className="invalid-feedback">{this.state.errors.email}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': this.state.errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {this.state.errors.password && <div className="invalid-feedback">{this.state.errors.password}</div>}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
              <div>
                <Link to="/"><h5>Continue without Sign in...</h5></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
const mapDispatchToProps = {
  loginUser,
  getCurrentUserDetails
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
