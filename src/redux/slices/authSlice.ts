import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    user: {
        username: string;
    } | null;
}

export interface AuthRootState {
    auth: AuthState;
}

const initialState: AuthState = {
    isAuthenticated: JSON.parse(localStorage.getItem('userProfile') || 'null')?true:false,
    user: JSON.parse(localStorage.getItem('userProfile') || '{}'),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ username: string }>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            localStorage.setItem('userProfile', JSON.stringify(action.payload));
        },
    },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
