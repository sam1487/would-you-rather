import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

class Leaderboard extends React.Component {
  render() {
    const { users, authedUser, location } = this.props;
    
    if (!authedUser) {
      return <Redirect to={{
        pathname: '/login',
        state: {
          parent: location.pathname
        }
      }} />
    }

    const sortedUsers = Object.keys(users).sort((a, b) =>
      (Object.keys(users[b].answers).length + (users[b].questions || []).length) -
      (Object.keys(users[a].answers).length + (users[a].questions || []).length)
    );

    return (
      <div style={{ margin: '10px' }}>
        {sortedUsers.map(id => (
          <div key={id} className="w3-panel w3-card w3-teal" style={{ fontSize: 'small', textAlign: 'left', margin: '10px auto', padding: '10px', borderRadius: '5px' }}>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ width: '50%' }}>
                    <div className="w3-container">
                      <img src={`${users[id].avatarURL}`} style={{ marginRight: '10px', width: '50px' }} alt="Avatar" className="w3-left w3-circle" />
                      <h5>{users[id].name}</h5>
                    </div>

                  </td>
                  <td style={{ color: 'lightgray' }}>asked: {(users[id].questions || []).length}</td>
                  <td style={{ color: 'lightgray' }}>answered: {Object.keys(users[id].answers).length}</td>
                  <td style={{ fontWeight: 'bold' }}>Total: {Object.keys(users[id].answers).length + (users[id].questions || []).length}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    authedUser: state.authedUser
  }
}

export default connect(mapStateToProps)(Leaderboard);