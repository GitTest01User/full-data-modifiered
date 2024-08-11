import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";

const initialState = {
  value: JSON.parse(secureLocalStorage.getItem("ASPPrice")) || {
    isActive: false,
  },
};

const slice = createSlice({
  name: "ASPPrice",
  initialState,
  reducers: {
    ASPPriceDetails: (state, action) => {
      secureLocalStorage.setItem("ASPPrice", JSON.stringify(action.payload));
      state.value = action.payload;
    },
  },
});

export const { ASPPriceDetails } = slice.actions;
export default slice.reducer;
