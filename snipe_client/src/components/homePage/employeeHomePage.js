import React, { Component } from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import IssueList from "../issues/issuesComponent"
export class EmployeePage extends Component {

  render() {
    return (
      <div>
        <IssueList/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmployeePage))
