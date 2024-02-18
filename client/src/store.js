// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web


const initialState = {
  isLoggedIn: false,
  theme: 'white'
};

const loginReducer = (state = initialState.isLoggedIn, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('Login Action Dispatched');
      return true;
    case 'LOGOUT':
      console.log('LOGOUT action dispatched')
      return false;
    default:
      return state;
  }
};

const themeReducer = (state = initialState.theme, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      console.log('TOGGLE_THEME action dispatched');
      return state === 'white' ? 'g100' : 'white';
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  isLoggedIn: loginReducer,
  theme: themeReducer
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
