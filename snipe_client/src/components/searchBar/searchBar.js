import React, { Component } from "react";
import "./serchBar.css";
import { issueLanguages } from "../../etc/issueLanguages";
import { issueTypes } from "../../etc/issueTypes";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setSearchResult } from "../../actions/searchActions";
import { fetchAllIssues } from "../../apiCalls/api";
class SearchBar extends Component {
  state = {
    issues: [],
    language: "",
    issueType: "",
    keyword: "",
    searchText: ""
  };
  componentDidMount() {
    fetchAllIssues().then(res => {
      this.setState({ issues: res });
    });
  }
  searchFunction = e => {
    e.preventDefault();
    let searchResult = [];
    let prom = new Promise((resolve, reject) => {
      let { issues, language, issueType, keyword, searchText } = this.state;

      let searchTerm = searchText.length ? searchText : keyword;
      if (
        issueType.length &&
        issueType !== "Select One" &&
        (language.length && language !== "Select One") &&
        searchTerm.length
      ) {
        searchResult = issues.filter(
          issue =>
            issueType === issue.issueType &&
            language === issue.language &&
            issue.issueDescription.includes(searchTerm.trim())
        );
      } else if (
        issueType.length &&
        issueType !== "Select One" &&
        (language.length && language !== "Select One")
      ) {
        searchResult = issues.filter(
          issue => issueType === issue.issueType && language === issue.language
        );
      } else if (
        language.length &&
        language !== "Select One" &&
        searchTerm.length
      ) {
        searchResult = issues.filter(
          issue =>
            language === issue.language &&
            issue.issueDescription.includes(searchTerm.trim())
        );
      } else if (
        issueType.length &&
        issueType !== "Select One" &&
        searchTerm.length
      ) {
        searchResult = issues.filter(
          issue =>
            issueType === issue.issueType &&
            issue.issueDescription.includes(searchTerm.trim())
        );
      } else if (
        issueType.length &&
        issueType !== "Select One" &&
        (!language.length || language === "Select One") &&
        !searchTerm.length
      ) {
        searchResult = issues.filter(issue => issueType === issue.issueType);
      } else if (
        (!issueType.length || issueType === "Select One") &&
        (language.length && language !== "Select One") &&
        !searchTerm.length
      ) {
        searchResult = issues.filter(issue => language === issue.language);
      } else if (
        (!issueType.length || issueType === "Select One") &&
        (!language.length || language === "Select One") &&
        searchTerm.length
      ) {
        searchResult = issues.filter(issue =>
          issue.issueDescription.includes(searchTerm.trim())
        );
      } else {
        searchResult = issues;
      }
      resolve();
    });
    prom.then(() => {
      this.setSearchResult(searchResult);
    });
  };
  setSearchResult = searchResult => {
    let prom = new Promise((res, rej) => {
      this.props.setSearchResult(searchResult);
      res();
    });
    prom.then(() => this.props.history.push("/issuesList"));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="input-group" id="adv-search">
              <input
                type="text"
                name="searchText"
                className="form-control"
                placeholder="Search for issue here"
                value={this.state.searchText}
                onChange={this.onChange}
              />
              <div className="input-group-btn">
                <div className="btn-group" role="group">
                  <div className="dropdown dropdown-lg">
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="caret">filter</span>
                    </button>
                    <div
                      className="dropdown-menu dropdown-menu-right"
                      role="menu"
                    >
                      <form>
                        <div className="form-group">
                          <label htmlFor="filter">Filter by</label>
                          <select
                            class="form-control form-control-lg"
                            name="language"
                            onChange={this.onChange}
                          >
                            {issueLanguages.map(issueLanguage => {
                              return (
                                <option
                                  value={
                                    issueLanguage === "All Languages"
                                      ? "Select One"
                                      : issueLanguage
                                  }
                                >
                                  {issueLanguage}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="filter">Filter by</label>
                          <select
                            class="form-control form-control-lg"
                            name="issueType"
                            onChange={this.onChange}
                          >
                            {issueTypes.map(issueType => {
                              return (
                                <option
                                  value={
                                    issueType === "All Types"
                                      ? "Select One"
                                      : issueType
                                  }
                                >
                                  {issueType}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        {!this.state.searchText.length ? (
                          <div className="form-group">
                            <label htmlFor="contain">Contains the words</label>
                            <input
                              className="form-control"
                              type="text"
                              name="keyword"
                              onChange={this.onChange}
                              value={this.state.keyword}
                            />
                          </div>
                        ) : null}
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={this.searchFunction}
                        >
                          <i class="fa fa-search" />
                        </button>
                      </form>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.searchFunction}
                  >
                    <i class="fa fa-search" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  searchResult: state.searchResult
});
const mapDispatchToProps = {
  setSearchResult
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchBar)
);
