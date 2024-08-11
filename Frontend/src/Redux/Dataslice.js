import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";

const initialState = {
  value: JSON.parse(secureLocalStorage.getItem("user")) || { isActive: false },
};

const slice = createSlice({
  name: "Detail",
  initialState,
  reducers: {
    ChangeDetails: (state, action) => {
      secureLocalStorage.setItem("user", JSON.stringify(action.payload));
      state.value = action.payload;
    },
  },
});

export const { ChangeDetails } = slice.actions;
export default slice.reducer;
