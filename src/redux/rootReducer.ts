import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import onboardingReducer from "./slices/onboardingSlice";

export default combineReducers({
  auth: authReducer,
  onboarding: onboardingReducer,
});