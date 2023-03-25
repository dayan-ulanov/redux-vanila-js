import './index.html';
import './index.scss';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { applyMiddleware, createStore, compose } from 'redux';

// import { createStore } from './modules/create-store';
import { rootReducer } from './redux/rootReducer';
import { asyncIncrement, changeTheme, decrement, increment } from './redux/actions';

const counter = document.querySelector('#counter');
const addBtn = document.querySelector('#add');
const subBtn = document.querySelector('#sub');
const asyncBtn = document.querySelector('#async');
const themeBtn = document.querySelector('#theme');

/* Logger ---------------------------------------
function logger(state) {
  return function(next) {
    return function(action) {
      console.log('Prev State: ', state.getState())
      console.log('Action: ', action)
      const newState = next(action)
      console.log('New State: ', newState)
      return next(action)
    }
  }
} ----------------------------------------------- */

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

addBtn.addEventListener('click', () => {
  store.dispatch(increment());
});

subBtn.addEventListener('click', () => {
  store.dispatch(decrement());
});

asyncBtn.addEventListener('click', () => {
  store.dispatch(asyncIncrement())
});

themeBtn.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('light')
    ? 'dark'
    : 'light'
  store.dispatch(changeTheme(newTheme))
})

store.subscribe(() => {
  const state = store.getState();

  document.body.className = state.theme.value
  counter.textContent = state.counter;

  [addBtn, subBtn, themeBtn, asyncBtn].forEach(btn => {
    btn.disabled = state.theme.disabled
  });
});

store.dispatch({ type: 'INIT_APLICATION' })