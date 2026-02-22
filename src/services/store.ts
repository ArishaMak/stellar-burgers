// services/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import ingredientsReducer from './slices/ingredientsSlice';
import feedSliceReducer from './slices/feedSlice';
import ordersSliceReducer from './slices/ordersSlice';
import userSliceReducer from './slices/userSlice';

const rootReducer = {
  ingredients: ingredientsReducer,
  feed: feedSliceReducer,
  orders: ordersSliceReducer,
  user: userSliceReducer,
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
