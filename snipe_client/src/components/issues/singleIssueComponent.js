import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AnswerComponent from "../answer/answerComponent";
import AnswersList from '../answer/answersList';
export class SingleIssue extends Component {

  render() {
    let { currentIssue } = this.props;
    return (
      <div className="container">
        <div className="row m-3">
          <div className="col align-self-start">
            <h3>{currentIssue.issueTitle}</h3>
          </div>
        </div>
        <div className="row m-3">
          <div className="col">{currentIssue.issueDescription}</div>
        </div>
        <div className="row m-3">
          <div className="col">
            <span>Views: </span>
            {currentIssue.views}
          </div>
          <div className="col">
            <span>Language: </span>
            {currentIssue.language}
          </div>
          <div className="col">
            <span>Tags: </span>
            {currentIssue.issueType}
          </div>
          <div className="col">
            <button className="btn btn-primary">Request Solution</button>
          </div>
        </div>
        <div className="col m-3">
          <AnswersList answerIds = {currentIssue.answers}/>
        </div>
        <div className="row m-3">
          <AnswerComponent/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentIssue: state.currentIssue.currentIssue
});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SingleIssue)
);
