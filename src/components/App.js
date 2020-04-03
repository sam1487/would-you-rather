import React, { Component } from 'react'
import NavBar from './NavBar'
import { Route, BrowserRouter, Redirect } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import AddQuestion from './AddQuestion'
import QuestionDetails from './QuestionDetails'
import Leaderboard from './Leaderboard'
import Login from './Login'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <LoadingBar />
          {this.props.authedUser && <NavBar />}
          <div className='container' style={{ width: '600px' }}>
            <Route exact path="/add" render={() => (<AddQuestion />)} />
            <Route exact path="/question/:id" render={(state) => (<QuestionDetails id={state.match.params.id} {...state} />)} />
            <Route exact path="/leaderboard" render={(state) => (<Leaderboard {...state} />)} />
            <Route exact path="/login" render={(state) => <Login {...state} />} />
            <Route exact path="/" render={(state) => (<Dashboard {...state} />)} />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

function mapStateToProps(state) {
  return {
    authedUser: state.authedUser,
    loading: state.authedUser === null
  }
}

export default connect(mapStateToProps)(App)