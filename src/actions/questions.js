import { _saveQuestion } from '../utils/_DATA'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions: questions,
  }
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question: question,
  }
}

export function handleAddQuestion(question) {
  return (dispatch) => {
    _saveQuestion(question)
      .then((formattedQuestion) => {
        dispatch(addQuestion(formattedQuestion));
      });
  }
}
