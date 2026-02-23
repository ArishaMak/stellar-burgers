import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientsReducer from './slices/ingredientsSlice';
import feedSliceReducer from './slices/feedSlice';
import ordersSliceReducer from './slices/ordersSlice';
import userSliceReducer from './slices/userSlice';
import constructorReducer from './constructorSlice';

// Объединяем редьюсеры через combineReducers для корректной типизации
const rootReducer = combineReducers({
  ingredient: ingredientsReducer,
  feed: feedSliceReducer,
  orders: ordersSliceReducer,
  user: userSliceReducer,
  burgerConstructor: constructorReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

// Типизация RootState на основе rootReducer
export type RootState = ReturnType<typeof rootReducer>;

// Типизация AppDispatch
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => dispatchHook<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;