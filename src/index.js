import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import App from './components/App';
import rootReducer from './reducers';

import './index.css';

const getEnhancer = () => {
  if (process.env.NODE_ENV === 'production') {
    return compose(applyMiddleware(thunk));
  }

  return compose(
    applyMiddleware(thunk),
    /* eslint-disable no-underscore-dangle */
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    /* eslint-enable no-underscore-dangle */
  );
};

const store = createStore(rootReducer, undefined, getEnhancer());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
