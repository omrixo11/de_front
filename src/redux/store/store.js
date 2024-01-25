// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from '../slices/authSlice';
import userReducer from '../features/userSlice';
import propertyReducer from '../slices/propertySlice';


const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['somePropertyToExclude'],
};

const propertyPersistConfig = {
  key: 'property',
  storage,
};

const rootReducer = {
  auth: persistReducer(authPersistConfig, authReducer),
  user: userReducer,
  property: persistReducer(propertyPersistConfig, propertyReducer),
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export { store, persistor };
