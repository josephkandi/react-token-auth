import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import auth0Client from '../Auth';

class SubmitAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
    };
  }

  updateAnswer(value) {
    this.setState({
      answer: value,
    });
  }

  submit() {
    const { submitAnswer } = this.props;
    const { answer } = this.state;
    submitAnswer(answer);

    this.setState({
      answer: '',
    });
  }

  render() {
    const { answer } = this.state;
    if (!auth0Client.isAuthenticated()) return null;
    return (
      <Fragment>
        <div className="form-group text-center">
          <label htmlFor="exampleInputEmail1">Answer:</label>
          <input
            id="exampleInputEmail1"
            type="text"
            onChange={(e) => { this.updateAnswer(e.target.value); }}
            className="form-control"
            placeholder="Share your answer."
            value={answer}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => { this.submit(); }}
        >
          Submit
        </button>
        <hr className="my-4" />
      </Fragment>
    );
  }
}

export default SubmitAnswer;
