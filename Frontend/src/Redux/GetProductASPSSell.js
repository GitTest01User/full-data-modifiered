import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";

const initialState = {
  value: JSON.parse(secureLocalStorage.getItem("ASP")) || { isActive: false },
};

const slice = createSlice({
  name: "DetailASP",
  initialState,
  reducers: {
    ASPDetails: (state, action) => {
      secureLocalStorage.setItem("ASP", JSON.stringify(action.payload));
      state.value = action.payload;
    },
  },
});

export const { ASPDetails } = slice.actions;
export default slice.reducer;
