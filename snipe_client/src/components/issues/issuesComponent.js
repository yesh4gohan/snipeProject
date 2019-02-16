import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { setIssueById, getAllIssues } from "../../actions/customActions";
class IssueList extends Component {
  async componentDidMount() {
    if (!this.props.searchResult.length) {
      await this.props.getAllIssues();
    }
  }
  
  renderIssueList = () => {
    if (this.props.searchResult.length) {
      return this.props.searchResult.map(result => (
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{result.issueTitle}</h3>
              <p>{result.issueDescription.substr(0, 40) + "..."}</p>
              <button
                className="btn btn-primary"
                onClick={e => this.setIssueById(e, result._id)}
              >
                View issue
              </button>
            </div>
            <div class="row align-items-center">
              <div class="col-3">{`language: ${result.language}`}</div>
              <div class="col-3">{`Views: ${result.views}`}</div>
              <div class="col-3">{`Answers: ${result.answerCount}`}</div>
              <div class="col-3">{`Requests: ${result.requests}`}</div>
            </div>
          </div>
        </div>
      ));
    } else if (this.props.issues.length) {
      return this.props.issues.map(result => (
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{result.issueTitle}</h3>
              <p>{result.issueDescription.substr(0, 40) + "..."}</p>
              <button
                className="btn btn-primary"
                onClick={e => this.setIssueById(e, result._id)}
              >
                View issue
              </button>
            </div>
            <div class="row align-items-center">
              <div class="col-3">{`language: ${result.language}`}</div>
              <div class="col-3">{`Views: ${result.views}`}</div>
              <div class="col-3">{`Answers: ${result.answerCount}`}</div>
              <div class="col-3">{`Requests: ${result.requests}`}</div>
            </div>
          </div>
        </div>
      ));
    } else {
      return <h1>OOPs no issues were found</h1>;
    }
  };
  setIssueById = (e, id) => {
    console.log(id);
    e.preventDefault();
    this.props.setIssueById(id, this.props.history);
  };
  render() {
    return (
      <div>
        <div className="profiles">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center">All issues</h1>
                <p className="lead text-center">
                  Here's the list of all issues
                </p>
                {this.renderIssueList()}
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchResult: state.searchResult.searchResult,
  issueId: state.issueId,
  issues: state.issues.issues
});

const mapDispatchToProps = {
  setIssueById,
  getAllIssues
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IssueList)
);
