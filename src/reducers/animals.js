import { SET_ANIMALS } from '../actions/constants';

const initialState = [];

export default function todayAnimals(state = initialState, action) {
  switch (action.type) {
    case SET_ANIMALS: {
      return [...action.data];
    }

    default:
      return state;
  }
}
