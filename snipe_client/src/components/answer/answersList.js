import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAnswersById } from "../../apiCalls/api";
export class AnswersList extends Component {
  state = {
    answers: []
  };
  componentDidMount() {
    let answerArray = [];

    this.props.answerIds &&
      this.props.answerIds.map(answerObj => {
        fetchAnswersById(answerObj._id).then(res => {
          answerArray.push(res);
          console.log(answerArray);
          this.setState({ answers: answerArray });
        });
      });
  }
  renderEachAnswer = () => {
    return this.state.answers.map((answer, key) => (
      <div key={key} className="card card-body bg-light mb-3">
        <div className="row m-1">
          <div className="col">{answer.answerDescription}</div>
        </div>
        <div className="row m-1">
          <div className="col-3"><button className = "btn btn-danger">Report spam</button></div>
          <div className="col-3"><span>Upvotes: </span>{answer.upVotes}</div>
          <div className="col-3"><button className = "btn btn-primary">Upvote</button></div>
          <div className="col-3">{answer.attachments}</div>
        </div>
      </div>
    ));
  };
  render() {
    if (!this.state.answers.length) {
      return <div>still loading.........</div>;
    }
    return (
      <div>
        <div className="profiles">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center">All answers</h1>
                <p className="lead text-center">
                  Here's the list of all answers
                </p>
                {this.renderEachAnswer()}
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswersList);
