import React from 'react'
import { Link } from 'react-router-dom';

class Question extends React.Component {

  render() {
    const { question, answerChoice, user } = this.props;
    if (!question || !user) {
      return null;
    }

    return (
      <Link to={`/question/${question.id}`} >
        <div style={{ margin: '10px' }}>
          <div className={"w3-panel w3-card " + (answerChoice ? 'w3-pale-blue' : ' w3-light-gray')} style={{ textAlign: 'left', margin: '10px auto', padding: '10px', borderRadius: '5px' }}>
            <h6><span style={{ color: 'gray', fontSize: 'smaller' }}>{user.name}</span> : Would you rather {question.optionOne.text} or {question.optionTwo.text}?
              </h6>
            <div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default Question;