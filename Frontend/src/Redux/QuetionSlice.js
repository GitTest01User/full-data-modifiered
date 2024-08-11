import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";

const initialState = {
  value: JSON.parse(secureLocalStorage.getItem("Quetion")) || {
    isActive: false,
  },
};

const slice = createSlice({
  name: "Quetion",
  initialState,
  reducers: {
    QuetionDetails: (state, action) => {
      secureLocalStorage.setItem("Quetion", JSON.stringify(action.payload));
      state.value = action.payload;
    },
  },
});

export const { QuetionDetails } = slice.actions;
export default slice.reducer;
