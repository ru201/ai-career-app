// store.js

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import dataReducer from './dataSlice';

const persistConfig = {
  key: 'data',
  storage,
};

const persistedReducer = persistReducer(persistConfig, dataReducer);

const store = configureStore({
  reducer: {
    data: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
