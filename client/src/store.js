// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Initial state for the auth reducer
const initialAuthState = {
  isAuthenticated: false,
};

// Auth reducer to handle login and logout actions
const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('Login Action Dispatched');
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      console.log('Logout Action Dispatched');
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

// Initial state for the theme reducer
const initialThemeState = 'white';

// Theme reducer to toggle the theme
const themeReducer = (state = initialThemeState, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      console.log('TOGGLE_THEME action dispatched');
      return state === 'white' ? 'g100' : 'white';
    default:
      return state;
  }
};

// Combining both reducers
const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
});

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

// Creating the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuring the store
export const store = configureStore({
  reducer: persistedReducer,
});

// Persistor for the store
export const persistor = persistStore(store);
