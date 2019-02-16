import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getAllEmployees } from "../../actions/authActions";
import EmployeeView from "./employeeListview";
import Register from "../authorization/register";
export class AdminPage extends Component {
  async componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      await this.props.getAllEmployees();
    }
  }
  state = {
    enableAddEmployee: false
  };
  toggleAddEmployeeView = e =>
    this.setState((prevState, prevProps) => {
      return { enableAddEmployee: !prevState.enableAddEmployee };
    });


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <ul className="list-group">
              {this.props.employees &&
                this.props.employees
                  .filter(employee => {
                    return employee.role === "employee";
                  })
                  .map(employee => {
                    return (
                      <li className="list-group-item">
                        <EmployeeView employee={employee} />
                      </li>
                    );
                  })}
            </ul>
          </div>
          <div className="col-6">
            {!this.state.enableAddEmployee ? (
              <button
                onClick={this.toggleAddEmployeeView}
                className="btn btn-info"
              >
                Add new employee
              </button>
            ) : (
              <div>
                <button
                  className="btn btn-link"
                  onClick={this.toggleAddEmployeeView}
                >
                  back
                </button>
                <Register />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  employees: state.employees.employees
});

const mapDispatchToProps = {
  getAllEmployees
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdminPage)
);
