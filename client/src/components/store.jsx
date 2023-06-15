import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // or import sessionStorage for session storage

// Define your initial state
const initialState = {
  user: null, // Placeholder for user information
};

// Define your reducer
const rootReducer = (state = initialState, action) => {
  // Handle actions here
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload, // Set the user information
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null, // Clear the user information
      };
    default:
      return state;
  }
};

// Configure Redux Persist
const persistConfig = {
  key: 'root',
  storage, // Specify the storage method (localStorage or sessionStorage)
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
