import { orderBurgerApi } from '@api';
import {
    PayloadAction,
    createAsyncThunk,
    createSlice,
    nanoid,
} from '@reduxjs/toolkit';

import {
    TConstructorIngredient,
    TIngredient,
    TOrder,
} from '../../utils/utils-types';

export type TConstructorState = {
    loading: boolean;
    constructorItems: {
        bun: TConstructorIngredient | null;
        ingredients: TConstructorIngredient[];
    };
    orderRequest: boolean;
    orderModalData: TOrder | null;
    error: string | null;
};

export const initialState: TConstructorState = {
    loading: false,
    constructorItems: {
        bun: null,
        ingredients: [],
    },
    orderRequest: false,
    orderModalData: null,
    error: null,
};

export const orderBurger = createAsyncThunk<
    { order: TOrder },
    string[],
    { rejectValue: string }
>('constructor/orderBurger', async (ingredientsIds, { rejectWithValue }) => {
    try {
        const response = await orderBurgerApi(ingredientsIds);
        return response;
    } catch (err: any) {
        return rejectWithValue(err.message || 'Не удалось оформить заказ');
    }
});

const constructorSlice = createSlice({
    name: 'constructor',
    initialState,

    selectors: {
        getConstructorState: (state) => state,
        selectConstructorItems: (state) => state.constructorItems,
        selectOrderRequest: (state) => state.orderRequest,
        selectOrderModalData: (state) => state.orderModalData,
    },

    reducers: {
        addIngredient: {
            reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
                if (action.payload.type === 'bun') {
                    state.constructorItems.bun = action.payload;
                } else {
                    state.constructorItems.ingredients.push(action.payload);
                }
            },
            prepare: (ingredient: TIngredient) => ({
                payload: { ...ingredient, id: nanoid() },
            }),
        },

        removeIngredient: (state, action: PayloadAction<string>) => {
            state.constructorItems.ingredients = state.constructorItems.ingredients.filter(
                (item: TConstructorIngredient) => item.id !== action.payload,  // ← явный тип
            );
        },

        moveIngredientUp: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            if (index <= 0) return;

            const items = state.constructorItems.ingredients;
            if (index >= items.length) return;

            const [movedItem] = items.splice(index - 1, 1) as [TConstructorIngredient];
            items.splice(index - 1 + 1, 0, movedItem);
        },

        moveIngredientDown: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            const items = state.constructorItems.ingredients;
            if (index < 0 || index >= items.length - 1) return;

            const [movedItem] = items.splice(index, 1) as [TConstructorIngredient];
            items.splice(index + 1, 0, movedItem);
        },

        clearConstructor: (state) => {
            state.constructorItems = { bun: null, ingredients: [] };
        },

        resetModal: (state) => {
            state.orderModalData = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(orderBurger.pending, (state) => {
                state.loading = true;
                state.orderRequest = true;
                state.error = null;
            })
            .addCase(orderBurger.rejected, (state, action) => {
                state.loading = false;
                state.orderRequest = false;
                state.error = action.payload ?? 'Неизвестная ошибка при создании заказа';
            })
            .addCase(orderBurger.fulfilled, (state, action) => {
                state.loading = false;
                state.orderRequest = false;
                state.error = null;
                state.orderModalData = action.payload.order;
                state.constructorItems = {
                    bun: null,
                    ingredients: [],
                };
            });
    },
});

export const {
    addIngredient,
    removeIngredient,
    moveIngredientUp,
    moveIngredientDown,
    clearConstructor,
    resetModal,
} = constructorSlice.actions;

export const {
    getConstructorState,
    selectConstructorItems,
    selectOrderRequest,
    selectOrderModalData,
} = constructorSlice.selectors;

export default constructorSlice.reducer;