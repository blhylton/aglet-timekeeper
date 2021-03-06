import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { createLogger } from 'redux-logger';
import App from './app.container';
import reducer from './reducers';

const logger = createLogger({
  collapsed: true,
  duration: true,
  timestamp: true,
  diff: true,
});

let store;

// only apply dev middleware in dev
if (process.env.NODE_ENV !== 'production') {
  store = createStore(reducer, applyMiddleware(logger));
} else {
  store = createStore(reducer);
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
