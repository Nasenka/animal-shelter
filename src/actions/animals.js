import { SET_ANIMALS } from './constants';

const setAnimals = data => {
  return {
    data,
    type: SET_ANIMALS,
  };
};

export const fetchAnimals = () => {
  return async dispatch => {
    const user = {
      username: 'test_user_1',
      password: 'user10000',
    };

    const token = await fetch('https://acits-api.herokuapp.com/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const { access } = await token.json();

    const response = await fetch(
      'https://acits-api.herokuapp.com/api/v1/animals/',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access}`,
          'current-shelter': 1,
        },
      },
    );

    console.log('response', response);

    const { results } = await response.json();

    console.log('results', results);

    dispatch(setAnimals(results));
  };
};

export const fetchLike = () => {};
