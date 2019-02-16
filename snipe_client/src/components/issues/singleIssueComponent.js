import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import AnswerComponent from "../answer/answerComponent";
import AnswersList from '../answer/answersList';
import {Link} from 'react-router-dom';
export class SingleIssue extends Component {
  state = {
    bigImage:false
  }
  imgClick = e => {
    this.setState({bigImage:true})
  }
  render() {
    let { currentIssue } = this.props;
    console.log(currentIssue.attachments)
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
        <div className="row m-3">
        {/* {!this.state.bigImage?<img  onClick = {this.imgClick} src={`http://localhost:9000${currentIssue.attachments}`} style = {{width :"200px",height:"200px"}}/>:<img src={`http://localhost:9000${currentIssue.attachments}`}/>} */}
        </div>
        <embed src={currentIssue.attachments && currentIssue.attachments.length && `http://localhost:9000${currentIssue.attachments[0]}`} style = {{width :"400px",height:"400px"}}/>
        <div className="col m-3">
          <AnswersList answerIds = {currentIssue.answers}/>
        </div>
        <div className="row m-3">
          <Link className = "btn btn-btn-link" to = "/answerIssue">Answer this issue</Link>
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
