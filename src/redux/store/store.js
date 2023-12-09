// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from '../slices/authSlice';
import userReducer from '../features/userSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['somePropertyToExclude'],
};

const rootReducer = {
  auth: persistReducer(authPersistConfig, authReducer),
  user: userReducer,
 
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export { store, persistor };
