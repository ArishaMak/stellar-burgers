import { getIngredientsApi } from '../../utils/burger-api'; // Используем относительный путь
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/utils-types';
import { RootState } from '../store';

export type TIngredientState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

const initialState: TIngredientState = {
  ingredients: [],
  loading: false,
  error: null
};

// Исправляем Thunk: явно указываем, что он возвращает массив TIngredient[]
export const getIngredients = createAsyncThunk<TIngredient[]>(
  'ingredient/get',
  async () => {
    const response = await getIngredientsApi();
    // Если getIngredientsApi возвращает напрямую массив, оставляем response
    // Если же там объект с полем data, оставляем response.data
    // Судя по ошибке TS2339, API возвращает TIngredient[] напрямую.
    return response;
  }
);

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки ингредиентов';
      })
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.loading = false;
          state.error = null;
          state.ingredients = action.payload;
        }
      );
  }
});

// Селекторы
export const selectIngredients = (state: RootState) =>
  state.ingredient.ingredients;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredient.loading;
export const selectIngredientsError = (state: RootState) =>
  state.ingredient.error;

export default ingredientSlice.reducer;
