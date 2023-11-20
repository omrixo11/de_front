// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import authReducer from '../slices/authSlice';
import userReducer from '../features/userSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['somePropertyToExclude'], // optional: properties you don't want to persist
};

const rootReducer = {
  auth: persistReducer(authPersistConfig, authReducer),
  user: userReducer,
 
};

const store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(store);

export { store, persistor };
