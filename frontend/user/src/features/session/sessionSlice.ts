import type {
  SessionRefreshReturnType,
  SessionSetCredentialsPayload,
  SessionSlice,
  User,
  UserSession,
} from "@/lib/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: SessionSlice = {
  isAuthenticated: false,
  accessToken: null,
  user: null,
  hasDailyLoginReward: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setCrenentials: (
      state,
      action: PayloadAction<SessionSetCredentialsPayload>,
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
    updateToken: (state, action: PayloadAction<SessionRefreshReturnType>) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.hasDailyLoginReward = action.payload.hasDailyLoginReward;
    },
  },
});

export const { setCrenentials, clearCredentials, updateToken } =
  sessionSlice.actions;
export default sessionSlice.reducer;
