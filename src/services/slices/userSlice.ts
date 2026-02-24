import {
    registerUserApi,
    loginUserApi,
    getUserApi,
    logoutApi,
    TRegisterData,
    TLoginData
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie } from '../../utils/cookie';
import { TOrder, TUser } from '../../utils/utils-types';

type TUserState = {
    request: boolean;
    error: string | null;
    response: TUser | null;
    registerData: TRegisterData | null;
    userData: TUser | null;
    isAuthChecked: boolean;
    isAuthenticated: boolean;
    loginUserRequest: boolean;
    userOrders: TOrder[];
};

const initialState: TUserState = {
    request: false,
    error: null,
    response: null,
    registerData: null,
    userData: null,
    isAuthChecked: false,
    isAuthenticated: false,
    loginUserRequest: false,
    userOrders: []
};

// Хендлеры API
export const registerUser = createAsyncThunk('user/regUser', registerUserApi);
export const loginUser = createAsyncThunk('user/loginUser', loginUserApi);
export const getUser = createAsyncThunk('user/getUser', getUserApi);
export const logoutUser = createAsyncThunk('user/logoutUser', logoutApi);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogout: (state) => {
            state.userData = null;
            state.isAuthenticated = false;
        },
        resetError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.userData = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.userData = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.userData = null;
                state.isAuthenticated = false;
                localStorage.clear();
                deleteCookie('accessToken');
            });
    }
});

export const { userLogout, resetError } = userSlice.actions;
export default userSlice.reducer;