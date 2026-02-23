import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
// ИМПОРТ RootState из стора, так как в types.ts его больше нет
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

export const getIngredients = createAsyncThunk(
    'ingredient/get',
    async () => {
        const response = await getIngredientsApi();
        // API обычно возвращает { success: true, data: [...] }
        return response.data || response;
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
            .addCase(getIngredients.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.ingredients = action.payload;
            });
    }
});

// Селекторы вынесены отдельно согласно ТЗ и стандартам RTK

export const selectIngredients = (state: RootState) => state.ingredient.ingredients;
export const selectIngredientsLoading = (state: RootState) => state.ingredient.loading;
export const selectIngredientsError = (state: RootState) => state.ingredient.error;

export default ingredientSlice.reducer;