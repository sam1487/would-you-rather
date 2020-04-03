import React from 'react'
import { connect } from 'react-redux'
import { handleSumbitAnswer } from '../actions/users'
import { Redirect } from 'react-router-dom'

class QuestionDetails extends React.Component {
  state = {
    submitted: false
  }

  makeChoice = (choice) => {
    const { id, questions, authedUser } = this.props;
    const question = questions[id];
    this.props.dispatch(handleSumbitAnswer(question.id, choice, authedUser));
    this.setState({ submitted: true });
  }

  render404 = () => {
    return (
      <div>
        <h2>404 - Not Found</h2>
      </div>
    );
  }

  computePercentage = (question) => {
    const total = question.optionTwo.votes.length + question.optionOne.votes.length;
    if (total === 0) return 0;
    return {
      optionOne: question.optionOne.votes.length * 100.0 / total,
      optionTwo: question.optionTwo.votes.length * 100.0 / total,
    }
  }

  renderForSubmission = () => {
    const { id, questions, users } = this.props;
    const question = questions[id];

    return (
      <div style={{ margin: '10px' }}>
          <div className={"w3-panel w3-card w3-light-gray"} style={{ textAlign: 'center', margin: '10px auto', padding: '10px', borderRadius: '5px' }}>
            <div className="w3-container" style={{ textAlign: 'left' }}>
              <img src={`${users[question.author].avatarURL}`} style={{ marginRight: '10px', width: '50px' }} alt="Avatar" className="w3-left w3-circle" />
              <h5>
                <div style={{ color: 'gray', fontSize: 'smaller', display: 'inline' }}>{users[question.author].name} : </div> Would you rather:
              </h5>
            </div>
            <div>
              <div onClick={() => this.makeChoice('optionOne')} className={'button button3'}>{question.optionOne.text}</div> &nbsp;
                <div onClick={() => this.makeChoice('optionTwo')} className={'button button3'}>{question.optionTwo.text}</div>
            </div>
          </div>
      </div>
    );
  }

  

  renderForStats = () => {
    const { id, questions, users, authedUser } = this.props;
    console.log('RenderForStats(): ', this.props);
    const question = questions[id];
    const answerChoice = users[authedUser].answers[id];



    return (
      <div style={{ margin: '10px' }}>
        <div className="w3-panel w3-card w3-pale-blue" style={{ textAlign: 'center', margin: '10px auto', padding: '10px', borderRadius: '5px' }}>
          {answerChoice &&
            <div style={{ fontSize: 'x-small', borderBottomRightRadius: '5px', borderTopLeftRadius: '5px', width: '60px', position: 'relative', top: '-10px', left: '-10px', background: 'darkgreen', color: 'white', padding: '3px' }}>My Pick</div>
          }
          <div style={{ marginTop: '-5px' }}>
            <div className="w3-container" style={{ textAlign: 'left' }}>
              <img src={`${users[question.author].avatarURL}`} style={{ marginRight: '10px', width: '50px' }} alt="Avatar" className="w3-left w3-circle" />
              <h5>
                <div style={{ color: 'gray', fontSize: 'smaller', display: 'inline' }}>{users[question.author].name} : </div> Would you rather:
              </h5>
            </div>

            <div>
              <div className={answerChoice === 'optionOne' ? 'button' : 'button button3'} >{question.optionOne.text}</div> &nbsp;
              <div className={answerChoice === 'optionTwo' ? 'button' : 'button button3'}>{question.optionTwo.text}</div>
            </div>
          </div>
        </div>
        <div className="w3-panel w3-card w3-indigo" style={{ textAlign: 'center', margin: '10px auto', padding: '10px', borderRadius: '5px' }}>
          <h5> Stats </h5>
          <div>
            <table style={{ width: '90%', margin: '10px auto', padding: '20px', background: 'rgba(200,200,200,0.3', borderRadius: '5px', textAlign: 'center' }}>
              <tbody>
                <tr style={{color: 'lightgray', paddingBottom: '10px'}}>
                  <th style={{textAlign: 'left'}}>Option</th>
                  <th style={{textAlign: 'center'}}>Total</th>
                  <th style={{textAlign: 'center'}}>Percentage</th>
                </tr>
                <tr>
                  <td style={{textAlign: 'left'}}>{question.optionOne.text}</td>
                  <td>{question.optionOne.votes.length}</td>
                  <td>{(this.computePercentage(question).optionOne || 0).toFixed(1)}</td>
                </tr>
                <tr>
                  <td style={{textAlign: 'left'}}>{question.optionTwo.text}</td>
                  <td>{question.optionTwo.votes.length}</td>
                  <td>{(this.computePercentage(question).optionTwo || 0).toFixed(1)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { id, questions, users, authedUser, location } = this.props;
    console.log('QD props: ', this.props);
    const question = questions[id];

    if (!authedUser) {
      return (<Redirect to={{
        pathname: '/login',
        state: {
          parent: location.pathname
        }
      }} />);
    }


    if (!question) {
      return this.render404();
    }


    const hasSubmitted = users[authedUser].answers.hasOwnProperty(id);

    return (
      <div>
        {hasSubmitted
          ? this.renderForStats()
          : this.renderForSubmission()
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    questions: state.questions,
    users: state.users,
    authedUser: state.authedUser,
  }
}

export default connect(mapStateToProps)(QuestionDetails);