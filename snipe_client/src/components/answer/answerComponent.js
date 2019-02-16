import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
class AnswerComponent extends Component {
  state = {
    answerDescription: "",
    attachment: {}
  };
  onChange = e => {
    this.setState({ answerDescription: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("attachment", this.state.attachment);
    const config = {
      headers: {
        "content-Type": "multipart/form-data"
      }
    };
    let payload = {
      issueId: this.props.currentIssue._id,
      answerDescription: this.state.answerDescription
    };
    console.log(this.props.currentIssue);
    axios
      .post("http://localhost:9000/api/issues/postImage", formData, config)
      .then(res => {
        payload.attachments = `/${res.data.path}`;
        axios
          .post("http://localhost:9000/api/issues/postAnswer", payload)
          .then(() => {
            this.props.history.push("/userHomePage");
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };
  onTextChange = e => {
    this.setState({ attachment: e.target.files[0] });
  };
  render() {
    return (
      <div className="container">
        <div className="card-header bg-info text-white">
          Submit your answer here...
        </div>
        <form onSubmit={this.onSubmit} enctype="multipart/form-data">
          <div className="form-group">
            <textarea
              className="form-control form-control-lg"
              name="issueDescription"
              placeholder="Brief description of issue.."
              value={this.state.answerDescription}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group" id="textIp">
            <label className="form-input-label" htmlFor="textIp">
              Upload supporting files
            </label>
            <div className="file-field">
              <div className="btn btn-primary btn-sm float-left">
                <input
                  type="file"
                  onChange={this.onTextChange}
                  name="attachment"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-info mt-4">
            Submit
          </button>
        </form>
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
  )(AnswerComponent)
);
