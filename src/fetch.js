import getExpiredDate from './utils/getExpiredDate';

export default async function myFetch(url) {
  const session = JSON.parse(localStorage.getItem('session'));
  const currentDate = new Date();
  let access;

  if (currentDate < new Date(session.expiredDate)) {
    access = session.access;
  } else {
    const response = await fetch(
      'https://acits-api.herokuapp.com/api/token/refresh/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh: session.refresh,
        }),
      },
    );

    const result = await response.json();

    access = result.access;
    session.access = result.access;
    session.expiredDate = getExpiredDate();
    localStorage.setItem('session', JSON.stringify(session));
  }

  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access}`,
      'current-shelter': 1,
    },
  });
}
