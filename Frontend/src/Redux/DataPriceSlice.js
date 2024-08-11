import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";

const initialState = {
  value: JSON.parse(secureLocalStorage.getItem("PriceData")) || {
    isActive: false,
  },
};

const slice = createSlice({
  name: "PriceData",
  initialState,
  reducers: {
    PriceDataDetails: (state, action) => {
      secureLocalStorage.setItem("PriceData", JSON.stringify(action.payload));
      state.value = action.payload;
    },
  },
});

export const { PriceDataDetails } = slice.actions;
export default slice.reducer;
