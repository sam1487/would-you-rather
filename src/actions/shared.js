import { _getQuestions, _getUsers } from '../utils/_DATA'
import { receiveQuestions } from './questions'
import { receiveUsers } from './users'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    Promise.all([
      _getQuestions(),
      _getUsers()
    ]).then(([questions, users]) => {
      dispatch(receiveQuestions(questions));
      dispatch(receiveUsers(users));
      dispatch(hideLoading());
    });
  }
}