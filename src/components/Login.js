import React from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  getUserSelector = () => {
    const element = document.getElementById('users');
    return element;
  }

  login = () => {
    const selectedUser = this.getUserSelector().value;
    this.props.dispatch(setAuthedUser(selectedUser));
  }

  render() {
    const { users, authedUser, location } = this.props;
    if (!users) {
      return null;
    }

    if (authedUser) {
      let parent = '/';
      if (location.state && location.state.parent) {
        parent = location.state.parent;
      }

      return (<Redirect to={parent} />);
    }

    return (
      <div className="w3-card-4" style={{ borderRadius: '5px', marginTop: '30px' }}>
        <header className="w3-container w3-light-grey" >
          <h3>Login</h3>
        </header>

        <div className="w3-container" style={{ margin: '20px', textAlign: 'center' }}>
          <label htmlFor="users">Choose a user:</label>
          <select style={{ marginLeft: '10px', width: '60%', background: 'lightgray', padding: '5px' }} id="users" >
            {Object.keys(users).map(id => (
              <option key={id} value={id}>{users[id].name}</option>
            ))}
          </select>
        </div>

        <button className="w3-button w3-block w3-dark-grey" onClick={() => this.login()}>Login</button>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    authedUser: state.authedUser,
  }
}

export default connect(mapStateToProps)(Login);