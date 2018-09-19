import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import auth0Client from '../Auth';

const API_URL = 'http://localhost:8081';

class NewQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      title: '',
      description: '',
    };
  }

  updateDescription(value) {
    this.setState({
      description: value,
    });
  }

  updateTitle(value) {
    this.setState({
      title: value,
    });
  }

  async submit() {
    const { title, description } = this.state;
    const { history } = this.props;
    this.setState({
      disabled: true,
    });

    await axios.post(API_URL, {
      title,
      description,
    }, {
      headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` },
    });

    history.push('/');
  }

  render() {
    const { disabled } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">New Question</div>
              <div className="card-body text-left">
                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <input
                    name="title"
                    disabled={disabled}
                    type="text"
                    onBlur={(e) => { this.updateTitle(e.target.value); }}
                    className="form-control"
                    placeholder="Give your question a title."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <input
                    name="description"
                    disabled={disabled}
                    type="text"
                    onBlur={(e) => { this.updateDescription(e.target.value); }}
                    className="form-control"
                    placeholder="Give more context to your question."
                  />
                </div>
                <button
                  type="button"
                  disabled={disabled}
                  className="btn btn-primary"
                  onClick={() => { this.submit(); }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NewQuestion);
