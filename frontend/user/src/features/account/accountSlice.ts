import { createSlice } from "@reduxjs/toolkit";

// TODO: add types for user and state
const initialState = {
  name: null,
  email: null,
  picture: null,
  country: null,
  timezone: null,
  offeredSkills: null,
  requestedSkills: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setDetails: (state, action) => {
      Object.keys(initialState).map((k) => {
        state[k as keyof typeof initialState] = action.payload[k];
      });
    },
  },
});

export const { setDetails } = accountSlice.actions;
export default accountSlice.reducer;
