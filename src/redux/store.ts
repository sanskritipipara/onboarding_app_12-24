import { configureStore } from '@reduxjs/toolkit';
import onboardingReducer from './slices/onboardingSlice.ts';
import authReducer from "./slices/authSlice.ts";

const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
    auth: authReducer,
  },
});

export default store;
