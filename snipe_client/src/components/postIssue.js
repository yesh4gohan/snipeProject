import React, { Component } from "react";
import { issueLanguages } from "../etc/issueLanguages";
import { issueTypes } from "../etc/issueTypes";
import { connect } from "react-redux";
import axios from "axios"
// import {addTextFile} from "../actions/attachmentActions";
class PostIssue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issueTitle: "",
      issueDescription: "",
      markImportant: false,
      issueType: "",
      language: "",
      imageAttachment:"",
      textAttachment:""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onCheck = e => {
    this.setState({ markImportant: !this.state.markImportant });
  };
  onTextChange = e => {
    let file = e.target.files[0];
    let textType = /text.*/;
    if (file.type.match(textType)) {
      let reader = new FileReader();
      reader.onload = () => {
        this.setState({ textAttachment: reader.result });
      };
      reader.readAsText(file);
    }
    else{
      window.alert("Incorrect file format!!!");
    }
  };
  onImageChange = e => {
    let image = e.target.files[0];
    let imageType = /image.*/;
    if(image.type.match(imageType)){
      let reader = new FileReader();
      reader.onload = () => {
        this.setState({imageAttachment:reader.result})
      }
      reader.readAsDataURL(image);
    }
  }
  onSubmit = e => {
    e.preventDefault();
    let payload = {...this.state};
    console.log(payload)
    axios.post('/api/issues/postIssue',payload)
    .then(res=>console.log(res))
  }
  render() {
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Post your issue here...
          </div>
          <div className="card-body">
            <form onSubmit = {this.onSubmit}>
              <div className="form-group">
                <input
                  type="title"
                  className="form-control form-control-lg"
                  placeholder="Title for issue"
                  name="issueTitle"
                  value={this.state.issueTitle}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  name="issueDescription"
                  placeholder="Brief description of issue.."
                  value={this.state.issueDescription}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="filter">
                  Please specify your coding language
                </label>
                <select
                  class="form-control form-control-lg"
                  name="language"
                  onChange={this.onChange}
                >
                  {issueLanguages.map(issueLanguage => {
                    return (
                      <option
                        value={
                          issueLanguage === "All Languages" ? "" : issueLanguage
                        }
                      >
                        {issueLanguage}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="filter">Please specify type of issue</label>
                <select
                  class="form-control form-control-lg"
                  name="issueType"
                  onChange={this.onChange}
                >
                  {issueTypes.map(issueType => {
                    return (
                      <option
                        value={issueType === "All Types" ? "" : issueType}
                      >
                        {issueType}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-check mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="markImportant"
                  checked={this.state.markImportant}
                  id="imp"
                  onChange={this.onCheck}
                />
                <label className="form-check-label" htmlFor="imp">
                  Mark as Important
                </label>
              </div>
              <div className="form-group" id="textIp">
                <label className="form-input-label" htmlFor="textIp">
                  Upload supporting text file
                </label>
                <div className="file-field">
                  <div className="btn btn-primary btn-sm float-left">
                    <input type="file" onChange={this.onTextChange} />
                  </div>
                  <div><pre>{this.state.textAttachment}</pre></div>
                </div>
              </div>
              <div className="form-group" id="imageIp">
                <label className="form-input-label" htmlFor="imageIp">
                  Upload supporting Image
                </label>
                <div className="file-field">
                  <div className="btn btn-primary btn-sm float-left">
                    <input type="file" onChange = {this.onImageChange}/>
                  </div>
                  <div className="file-path-wrapper">
                    <img
                      src={this.state.imageAttachment}
                      width = "50px"
                      className="file-path validate"
                      type="text"
                      alt = ""
                      placeholder="Upload Image Here"
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});
const mapDisPatchToProps = {
  
};
export default connect(
  mapStateToProps,
  mapDisPatchToProps
)(PostIssue);
