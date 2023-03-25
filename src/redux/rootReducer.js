import { combineReducers } from "redux";
import { CHANGE_THEME, DECREMENT, ENABLE_BUTTONS, DISABLE_BUTTONS, INCREMENT } from "./type";

function counterReducer(state = 0, action) {
  if (action.type === INCREMENT) {
    return state + 1;
  } else if (action.type === DECREMENT) {
    return state - 1;
  }

  return state
}

const initialThemeState = {
  value: 'light',
  disables: false
}

function themeReducer(state = initialThemeState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return {...state, value: action.payload}
    case ENABLE_BUTTONS:
      return {...state, disables: false}
    case DISABLE_BUTTONS:
      return {...state, disables: true}
    default: return state
  }

  return state
}

export const rootReducer = combineReducers({
  counter: counterReducer,
  theme: themeReducer
})