import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
class EmployeeListView extends Component {
  render() {
    let { employee } = this.props;
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row m-1">
          <div className="col-6">
            <h6>
              <Link to="/">{employee.bio.name}</Link>
            </h6>
          </div>
          <div className="col-6">
            <span>Answered Issues: </span>
            {employee.answerdIssues.length}
          </div>
        </div>
        <div className="row m-1">
          <div className="col-2">Skills: </div>
          <div className="col-10">
            {employee.bio.skills.map((skill, key) => (
              <span>
                {employee.bio.skills[key + 1] ? `${skill}, ` : `${skill}`}
              </span>
            ))}
          </div>
        </div>
        <div className="row m-1">
          <div className="col-6">
            <button className="btn btn-sm btn-danger">Remove Employee</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EmployeeListView)
);
