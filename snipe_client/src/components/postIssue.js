import React, { Component } from "react";
import { issueLanguages } from "../etc/issueLanguages";
import { issueTypes } from "../etc/issueTypes";
import { connect } from "react-redux";
import axios from "axios";
import {withRouter} from "react-router-dom"
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
      Attachment: {}
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onCheck = e => {
    this.setState({ markImportant: !this.state.markImportant });
  };
  onTextChange = e => {
    // let file = e.target.files[0];
    // console.log(e.target.files[0])
    // let textType = /text.*/;
    // if (file.type.match(textType)) {
    //   let reader = new FileReader();
    //   reader.onload = () => {
    //     console.log({READER:reader.result})
    //     axios.post('http://localhost:9000/api/issues/addFile',reader.result)
    //     .then(res => console.log("success"))
    //     .catch(err => console.log(err))
    //   };
    //   reader.readAsArrayBuffer(file);
    // }
    // else{
    //   window.alert("Incorrect file format!!!");
    // }
    this.setState({ Attachment: e.target.files[0] });
  };
  onImageChange = e => {
    let image = e.target.files[0];
    // axios.post('/api/issues/addImage',image)
    // .then(res => console.log("success"))
    // .catch(err => console.log(err))
    let imageType = /image.*/;
    if (image.type.match(imageType)) {
      let reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
      };
      reader.readAsBinaryString(image);
    }
  };
  onSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("attachment", this.state.Attachment);
    const config = {
      headers: {
        "content-Type": "multipart/form-data"
      }
    };
    let payload = {
      issueTitle: this.state.issueTitle,
      issueDescription: this.state.issueDescription,
      markImportant: this.state.markImportant,
      issueType: this.state.issueType,
      language: this.state.language
    };
    axios
      .post("http://localhost:9000/api/issues/postImage", formData, config)
      .then(res => {
        payload.attachments = `/${res.data.path}`;
        axios.post("http://localhost:9000/api/issues/postIssue",payload)
        .then(()=>{
          this.props.history.push('/issuesList')
        })
        .catch(err=>console.log(err))
      })
      .catch(err => console.log(err));
  };

  // e.preventDefault();
  //   console.log(this.state)
  //   const formData = new FormData();

  //   formData.append('attachment',this.state.textAttachment);
  //   const payload = {
  //     issueTitle: this.state.issueTitle,
  //     issueDescription: this.state.issueDescription,
  //     markImportant: this.state.markImportant,
  //     issueType: this.state.issueType,
  //     language: this.state.language,
  //     textAttachment:formData
  //   }
  //   const config = {
  //     headers:{
  //       'content-Type':'multipart/form-data'
  //     }
  //   };
  //   axios.post('http://localhost:9000/api/issues/postIssue',payload,config)
  //   .then(res=>console.log(res))
  //   .catch(err=>console.log(err))
  render() {
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Post your issue here...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit} enctype="multipart/form-data">
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
              <div className="form-group">
              <button type="submit" className="btn btn-primary float-left">
                Submit
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentIssue:state.currentIssue
});
const mapDisPatchToProps = {};
export default withRouter(connect(
  mapStateToProps,
  mapDisPatchToProps
)(PostIssue));
