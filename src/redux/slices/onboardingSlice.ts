import { createSlice  } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface Profile {
  name: string;
  age: string;
  email: string;
  image: string;
  imageName: string;
}

interface Payment {
  cardNumber: string;
  expiry: string;
  cvv: string;
}

interface OnboardingState {
  step: number;
  profile: Profile;
  songs: string[];
  payment: Payment;
}

const initialState: OnboardingState = {
  step: 1,
  profile: { name: "", age: "", email: "", image: "", imageName: "" },
  songs: [],
  payment: { cardNumber: "", expiry: "", cvv: "" },
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    saveProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },
    saveSongs: (state, action: PayloadAction<string[]>) => {
      state.songs = action.payload;
    },
    savePayment: (state, action: PayloadAction<Payment>) => {
      state.payment = action.payload;
    },
    resetOnboarding: () => initialState,
  },
});

export const { setStep, saveProfile, saveSongs, savePayment, resetOnboarding } =
  onboardingSlice.actions;

export default onboardingSlice.reducer;