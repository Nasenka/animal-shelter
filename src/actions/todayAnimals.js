import fetch from '../fetch';

import { SET_TODAY_ANIMALS } from './constants';

const setTodayAnimals = data => {
  return {
    data,
    type: SET_TODAY_ANIMALS,
  };
};

export const fetchTodayAnimals = () => {
  return async dispatch => {
    const response = await fetch(
      'https://acits-api.herokuapp.com/api/v1/prescriptions/today/',
    );

    const { results } = await response.json();

    dispatch(setTodayAnimals(results));
  };
};

export const fetchLike = () => {};
