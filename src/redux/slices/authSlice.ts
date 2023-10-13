import { createSlice } from "@reduxjs/toolkit";
import { Auth } from "../../interfaces";

const initialState: Auth = {
  role: "All",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: () => initialState,

    changeRole: (state: Auth, action) => {
      state.role = action.payload;
    },
  },
});

export const { resetAuth, changeRole } = authSlice.actions;
export const authReducer = authSlice.reducer;
