import fetch from '../fetch';

import { SET_ANIMALS } from './constants';

const setAnimals = data => {
  return {
    data,
    type: SET_ANIMALS,
  };
};

export const fetchAnimals = () => {
  return async dispatch => {
    const response = await fetch(
      'https://acits-api.herokuapp.com/api/v1/animals/',
    );

    const { results } = await response.json();

    dispatch(setAnimals(results));
  };
};

export const fetchLike = () => {};
