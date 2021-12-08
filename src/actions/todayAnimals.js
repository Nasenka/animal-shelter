import { SET_TODAY_ANIMALS } from './constants';

const setTodayAnimals = data => {
  return {
    data,
    type: SET_TODAY_ANIMALS,
  };
};

export const fetchTodayAnimals = () => {
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

    console.log('access', access);

    const response = await fetch(
      'https://acits-api.herokuapp.com/api/v1/prescriptions/today/',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access}`,
          'current-shelter': 1,
        },
      },
    );

    const { results } = await response.json();

    dispatch(setTodayAnimals(results));
  };
};

export const fetchLike = () => {
  // return async dispatch => {
  //   await unsplash.photos.likePhoto(id);
  //   dispatch(setLike(id));
  // };
};
