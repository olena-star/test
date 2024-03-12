import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { apiCatigoriesSlice } from './reducers/apiCatigoriesSlice';
import { apiGoodsSlice } from './reducers/apiGoodsSlice';
import themeReducer from './reducers/themeSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  theme: themeReducer,
  [apiCatigoriesSlice.reducerPath]: apiCatigoriesSlice.reducer,
  [apiGoodsSlice.reducerPath]: apiGoodsSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blackList: [apiCatigoriesSlice.reducer, apiGoodsSlice.reducer],
  whiteList: ['theme'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiCatigoriesSlice.middleware, apiGoodsSlice.middleware),
});

export let persistor = persistStore(store);
