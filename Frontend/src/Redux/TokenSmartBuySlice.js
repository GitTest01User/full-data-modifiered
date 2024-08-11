import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";

const initialState = {
  value: JSON.parse(secureLocalStorage.getItem("bToken")) || undefined,
};

const slice = createSlice({
  name: "UserBuy",
  initialState,
  reducers: {
    ChangeUserBInfo: (state, action) => {
      secureLocalStorage.setItem("bToken", JSON.stringify(action.payload));
      state.value = action.payload;
    },
  },
});

export const { ChangeUserBInfo } = slice.actions;
export default slice.reducer;
