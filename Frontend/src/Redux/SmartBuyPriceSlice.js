import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";

const initialState = {
  value: JSON.parse(secureLocalStorage.getItem("SmartBuySbUserSb")) || {
    isActive: false,
  },
};

const slice = createSlice({
  name: "SmartBuySb",
  initialState,
  reducers: {
    SmartBuySbDetails: (state, action) => {
      secureLocalStorage.setItem(
        "SmartBuySbUserSb",
        JSON.stringify(action.payload)
      );
      state.value = action.payload;
    },
  },
});

export const { SmartBuySbDetails } = slice.actions;
export default slice.reducer;
