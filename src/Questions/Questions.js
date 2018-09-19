import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8081/';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: null,
      status: 'Loading questions...',
    };
  }

  async componentDidMount() {
    try {
      const questions = (await axios.get(API_URL)).data;
      this.setState({
        questions,
      });
    } catch (error) {
      this.setState(() => ({
        status: 'Error loading questions. Refresh the page to try again',
      }));
    }
  }

  render() {
    const { questions, status } = this.state;
    return (
      <div className="container">
        <div className="row">
          <Link to="/new-question">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header">Need help? Ask here!</div>
              <div className="card-body">
                <h4 className="card-title">+ New Question</h4>
                <p className="card-text">Don't worry. Help is on the way!</p>
              </div>
            </div>
          </Link>
          { questions === null && <p>{ status }</p> }
          {
            questions && questions.map(question => (
              <div key={question.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/question/${question.id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">
                     Answers:
                      {' '}
                      {question.answers}
                    </div>
                    <div className="card-body">
                      <h4 className="card-title">{question.title}</h4>
                      <p className="card-text">{question.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Questions;
