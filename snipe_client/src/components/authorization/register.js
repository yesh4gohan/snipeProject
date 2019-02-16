import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerNewUser } from "../../actions/authActions";
import { withRouter } from "react-router-dom";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      name: "",
      email: "",
      password: "",
      password2: "",
      skills: "",
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit = e => {
    e.preventDefault();
    let { role, name, email, password, password2, skills } = this.state;
    let userObj = {
      role,
      email,
      name,
      password,
      password2,
      skills
    };
    this.props.registerNewUser(userObj, this.props.history);
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onRadioChange = e => this.setState({ role: e.target.name });
  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create an Employee account</p>
              <form onSubmit={this.onSubmit}>
                <h6>Choose Role</h6>
                <div className="form-radio mb-4" id="role">
                  <input
                    className={classnames("form-control form-control-sm", {
                      "is-invalid": this.state.errors.role
                    })}
                    type="radio"
                    name="admin"
                    checked={this.state.role === "admin"}
                    id="admin"
                    onChange={this.onRadioChange}
                  />
                  <label className="form-radio-label" htmlFor="admin">
                    Admin
                  </label>
                </div>
                <div className="form-radio mb-4">
                  <input
                    className={classnames("form-control form-control-sm", {
                      "is-invalid": this.state.errors.role
                    })}
                    type="radio"
                    name="employee"
                    checked={this.state.role === "employee"}
                    id="employee"
                    onChange={this.onRadioChange}
                  />
                  <label className="form-radio-label" htmlFor="employee">
                    Employee
                  </label>
                  {this.state.errors.role && (
                    <div className="invalid-feedback">
                      {this.state.errors.role}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.state.errors.name
                    })}
                    placeholder="Name"
                    name="name"
                    onChange={this.onChange}
                    value={this.state.name}
                  />
                  {this.state.errors.name && (
                    <div className="invalid-feedback">
                      {this.state.errors.name}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.state.errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    onChange={this.onChange}
                    value={this.state.email}
                  />
                  {this.state.errors.email && (
                    <div className="invalid-feedback">
                      {this.state.errors.email}
                    </div>
                  )}
                </div>
                {this.state.role === "employee" ? (
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": this.state.errors.skills
                      })}
                      placeholder="Skills"
                      name="skills"
                      value={this.state.skills}
                      onChange={this.onChange}
                    />
                    {this.state.errors.skills && (
                      <div className="invalid-feedback">
                        {this.state.errors.skills}
                      </div>
                    )}
                    <small className="form-text text-muted">
                      Please use comma separated values (eg.
                      HTML,CSS,JavaScript,PHP)
                    </small>
                  </div>
                ) : null}
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.state.errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    onChange={this.onChange}
                    value={this.state.password}
                  />
                  {this.state.errors.password && (
                    <div className="invalid-feedback">
                      {this.state.errors.password}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.state.errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    onChange={this.onChange}
                    value={this.state.password2}
                  />
                  {this.state.errors.password2 && (
                    <div className="invalid-feedback">
                      {this.state.errors.password2}
                    </div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
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
  registerNewUser
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Register)
);
