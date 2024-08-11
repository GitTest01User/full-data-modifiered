import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";

const initialState = {
  value: JSON.parse(secureLocalStorage.getItem("ProductUserSb")) || {
    isActive: false,
  },
};

const slice = createSlice({
  name: "ProductSb",
  initialState,
  reducers: {
    ProductSbDetails: (state, action) => {
      secureLocalStorage.setItem(
        "ProductUserSb",
        JSON.stringify(action.payload)
      );
      state.value = action.payload;
    },
  },
});

export const { ProductSbDetails } = slice.actions;
export default slice.reducer;
