const Validator = require('validator');
const isEmpty = require('./checkEmpty');

module.exports = function validateIssueInput(data) {
  let errors = {};

  data.issueTitle = !isEmpty(data.issueTitle) ? data.issueTitle : '';
  data.issueDescription = !isEmpty(data.issueDescription) ? data.issueDescription : '';

  if (Validator.isEmpty(data.issueTitle)) {
    errors.issueTitle = 'issueTitle field is required';
  }

  if (Validator.isEmpty(data.issueDescription)) {
    errors.issueDescription = 'issueDescription field is required';
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
