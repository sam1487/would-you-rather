import { RECEIVE_QUESTIONS, ADD_QUESTION } from '../actions/questions'
import { SUBMIT_ANSWER } from '../actions/users'

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case SUBMIT_ANSWER: 
      return {
        ...state,
        [action.questionId]: {
          ...state[action.questionId],
          [action.answer]: {
            ...state[action.questionId][action.answer],
            votes: state[action.questionId][action.answer].votes.concat([action.questionId])
          }
        }
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      }
    default:
      return state;
  }
}