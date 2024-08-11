import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";

const initialState = {
  value: JSON.parse(secureLocalStorage.getItem("CustomerUserSb")) || { isActive: false },
};

const slice = createSlice({
  name: "CustomerSb",
  initialState,
  reducers: {
    CustomerSbDetails: (state, action) => {
      secureLocalStorage.setItem("CustomerUserSb", JSON.stringify(action.payload));
      state.value = action.payload;
    },
  },
});

export const { CustomerSbDetails } = slice.actions;
export default slice.reducer;
