import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from 'src/utils/utils-types';

type TFeedState = {
    orders: TOrder[];
    total: number;
    totalToday: number;
    loading: boolean;
    error: string | null;
};

const initialState: TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
};

export const getFeeds = createAsyncThunk('feeds/all', getFeedsApi);

export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFeeds.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFeeds.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string;
            })
            .addCase(getFeeds.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.orders = action.payload.orders;
                state.total = action.payload.total;
                state.totalToday = action.payload.totalToday;
            });
    }
});

export const selectFeedOrders = (state: any) => state.feed.orders;
export const selectFeedLoading = (state: any) => state.feed.loading;

export default feedSlice.reducer;
