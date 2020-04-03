import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class NavBar extends React.Component {
  logout = () => {
    this.props.dispatch(setAuthedUser(null));
  }

  render() {
    const { users, authedUser } = this.props;
    return (
      <div style={{ height: '80px', background: 'ghostwhite', paddingLeft: '100px' }}>
        <nav className='nav'>
          <ul style={{ float: 'left', width: '300px' }}>
            <li>
              <NavLink to='/' exact activeClassName='active'>
                Home
            </NavLink>
            </li>
            <li>
              <NavLink to='/add' activeClassName='active'>
                Add Question
            </NavLink>
            </li>
            <li>
              <NavLink to='/leaderboard' activeClassName='active'>
                Leaderboard
            </NavLink>
            </li>
          </ul>

        </nav>
        {authedUser &&
          <nav className="nav" style={{ float: 'right', width: '300px' }}>
            <ul style={{ background: 'ghostwhite' }}>
              <li style={{ fontFamily: 'monospace', color: 'darkred', fontWeight: 'bold' }}>
                [{users[authedUser].name}]
              </li>
              <li>
                <NavLink style={{ fontWeight: 'normal' }} to='/login' exact activeClassName='active' onClick={this.logout}>
                  Logout
                </NavLink>
              </li>

            </ul>
          </nav>
        }
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    authedUser: state.authedUser,
    users: state.users,
  }
}

export default connect(mapStateToProps)(NavBar);