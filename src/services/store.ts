import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchRTK,
  useSelector as selectorRTK
} from 'react-redux';

import ingredientsReducer from './slices/ingredientsSlice';
import feedSliceReducer from './slices/feedSlice';
import orderSliceReducer from './slices/orderSlice';
import userSliceReducer from './slices/userSlice';
import constructorReducer from './slices/constructorSlice';

const store = configureStore({
  reducer: {
    ingredient: ingredientsReducer,
    feed: feedSliceReducer,
    order: orderSliceReducer,
    user: userSliceReducer,
    burgerConstructor: constructorReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => dispatchRTK<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorRTK;

export default store;
