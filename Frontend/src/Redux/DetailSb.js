import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";

const initialState = {
  value: JSON.parse(secureLocalStorage.getItem("userSb")) || { isActive: false },
};

const slice = createSlice({
  name: "DetailSb",
  initialState,
  reducers: {
    ChangeSbDetails: (state, action) => {
      secureLocalStorage.setItem("userSb", JSON.stringify(action.payload));
      state.value = action.payload;
    },
  },
});

export const { ChangeSbDetails } = slice.actions;
export default slice.reducer;
