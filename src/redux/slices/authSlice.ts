import { createSlice } from "@reduxjs/toolkit";
import { Auth } from "../../interfaces";

const initialState: Auth = {
  role: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state: Auth) => initialState,

    changeRole: (state: Auth, action) => {
      state.role = action.payload;
    },
  },
});

export const { resetAuth, changeRole } = authSlice.actions;
export const authReducer = authSlice.reducer;
