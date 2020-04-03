import { _saveQuestionAnswer } from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const SUBMIT_ANSWER = 'SUMBIT_ANSWER';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export function submitAnswer(questionId, answer, authedUser) {
  return {
    type: SUBMIT_ANSWER,
    questionId: questionId,
    answer: answer,
    authedUser: authedUser
  }
}

export function handleSumbitAnswer(questionId, answer, authedUser) {
  return (dispatch) => {
    dispatch(showLoading());
    _saveQuestionAnswer({ authedUser: authedUser, qid: questionId, answer: answer })
      .then(() => {
        dispatch(submitAnswer(questionId, answer, authedUser))
        dispatch(hideLoading());
      });
  }
}
