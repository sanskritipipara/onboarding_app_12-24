import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  name: string;
  age: string;
  email: string;
  profilePicture: string | null;
}

export interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface OnboardingState {
  step: number;
  userProfile: UserProfile;
  favoriteSongs: string[];
  paymentInfo: PaymentInfo; 
}

export interface RootState {
  onboarding: OnboardingState;
}

const initialState: OnboardingState = {
  step: Number(localStorage.getItem('onboardingStep')) || 1,
  userProfile: JSON.parse(localStorage.getItem('userProfile') || '{}'),
  favoriteSongs: JSON.parse(localStorage.getItem('favoriteSongs') || '[]'),
  paymentInfo: JSON.parse(localStorage.getItem('paymentInfo') || '{}'),
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
      localStorage.setItem('onboardingStep', action.payload.toString());
    },
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.userProfile = action.payload;
      localStorage.setItem('userProfile', JSON.stringify(action.payload));
    },
    setFavoriteSongs: (state, action: PayloadAction<string[]>) => {
      state.favoriteSongs = action.payload;
      localStorage.setItem('favoriteSongs', JSON.stringify(action.payload));
    },
    setPaymentInfo: (state, action: PayloadAction<PaymentInfo>) => {
      state.paymentInfo = action.payload;
      localStorage.setItem('paymentInfo', JSON.stringify(action.payload));
    },
  },
});

export const { setStep, setUserProfile, setFavoriteSongs, setPaymentInfo } = onboardingSlice.actions;
export default onboardingSlice.reducer;
