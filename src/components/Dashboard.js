import React from 'react'
import { connect } from 'react-redux'
import TabBar from './TabBar';
import Question from './Question';
import { handleSumbitAnswer } from '../actions/users'
import { Redirect } from 'react-router-dom';

class Dashboard extends React.Component {
  state = {
    selectedTab: 'Unanswered'
  }

  makeChoice = (question, choice) => {
    this.props.dispatch(handleSumbitAnswer(question.id, choice, this.props.authedUser));
  }

  renderUnanswered = () => {
    const { questions, users, authedUser } = this.props;
    const unansweredQuestions = Object.keys(questions || {})
      .filter(id => !users[authedUser].answers.hasOwnProperty(id))
      .map(id => questions[id])
      .sort((a, b) => b.timestamp - a.timestamp)

    return (
      <div style={{ margin: '10px' }}>
        {unansweredQuestions.length > 0
          ? unansweredQuestions.map(q => <Question key={q.id} question={q} user={users[q.author]} onChoiceClick={(choice) => this.makeChoice(q, choice)} />)
          : <div style={{ textAlign: 'center' }}>No unanswered questions!</div>
        }
      </div>
    );
  }

  renderAnswered = () => {
    const { questions, users, authedUser } = this.props;
    const answeredQuestions = Object.keys(users[authedUser].answers).map(id => questions[id]).sort((a, b) => b.timestamp - a.timestamp);

    return (
      <div style={{ margin: '10px' }}>
        {answeredQuestions
          ? answeredQuestions.map(q => <Question key={q.id} question={q} user={users[q.author]} answerChoice={users[authedUser].answers[q.id]} onChoiceClick={() => null} />)
          : <div>No questions answered yet.</div>
        }
      </div>
    );
  }

  render() {
    const { authedUser } = this.props;

    if (!authedUser) {
      return (<Redirect to={{
        pathname: '/login',
        state: {
          parent: '/'
        }
      }} />);
    }

    return (
      <div>
        <TabBar tabs={['Unanswered', 'Answered']} selected={this.state.selectedTab} onClickTab={(tab) => this.setState({ selectedTab: tab })} />
        {this.state.selectedTab === 'Answered'
          ? this.renderAnswered()
          : this.renderUnanswered()
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


export default connect(mapStateToProps)(Dashboard);