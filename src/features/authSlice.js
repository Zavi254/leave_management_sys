import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for signing up
export const signupUser = createAsyncThunk(
    'auth/signup',
    async (userData) => {
        const response = await axios.post('http://localhost:3000/api/auth/signup', userData);
        return response.data;
    }
);

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token); // persist token
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token'); // remove token on logout
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user; // Adjust according to your API response
                state.token = action.payload.token; // Store token if provided
                localStorage.setItem('token', action.payload.token); // persist token
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Set error message
            });
    },
});

export const { login, logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
