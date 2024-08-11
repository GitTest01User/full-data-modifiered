

import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";

const initialState = {
  value: JSON.parse(secureLocalStorage.getItem("token")) || undefined,
};

const slice = createSlice({
  name: "User",
  initialState,
  reducers: {
    ChangeUserInfo: (state, action) => {
      secureLocalStorage.setItem("token", JSON.stringify(action.payload));
      state.value = action.payload;
    },
  },
});

export const { ChangeUserInfo } = slice.actions;
export default slice.reducer;
