import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'

class AddQuestion extends React.Component {
  state = {
    optionOne: '',
    optionTwo: '',
    submitted: false
  }

  handleTextChange = (text, source) => {
    if (source === 'optionOne') {
      this.setState({ optionOne: text });
    }
    else if (source === 'optionTwo') {
      this.setState({ optionTwo: text });
    }
  }

  submitQuestion = () => {
    const { optionOne, optionTwo } = this.state;
    if (!optionOne.trim() || !optionTwo.trim()) {
      alert('Must fill in two choices for the question');
      return;
    }

    this.setState({
      submitted: true
    });

    this.props.dispatch(handleAddQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: this.props.authedUser,
    }))
  }

  resetQuestion = () => {
    this.setState({
      optionOne: '',
      optionTwo: ''
    });

  }

  render() {
    if (!this.props.authedUser) {
      return <Redirect to={{
        pathname: '/login',
        state: {
          parent: '/add'
        }
      }
      } />
    }


    if (this.state.submitted) {
      return <Redirect to={{
        pathname: '/',
        state: {
          parent: '/add'
        }
      }
      } />
    }

    return (
      <div className="w3-panel w3-card">
        <h3>Would you rather: </h3>
        <div style={{ margin: '10px' }}>
          <input 
            style={{ width: '100%' }} 
            type="text" 
            placeholder="Option 1"
            onChange={(event) => this.handleTextChange(event.target.value, 'optionOne')}
            value={this.state.optionOne} />
        </div>
        <div style={{ margin: '10px' }}>
          <input 
            style={{ width: '100%' }} 
            type="text" 
            placeholder="Option 2"
            onChange={(event) => this.handleTextChange(event.target.value, 'optionTwo')}
            value={this.state.optionTwo} />
        </div>
        <div style={{ margin: '10px', textAlign: 'center' }}>
          <button 
            className="button button2" 
            onClick={this.resetQuestion}>Reset
          </button> &nbsp;
          <button 
            className="button button2" 
            onClick={this.submitQuestion}>Submit
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authedUser: state.authedUser
  }
}

export default connect(mapStateToProps)(AddQuestion);