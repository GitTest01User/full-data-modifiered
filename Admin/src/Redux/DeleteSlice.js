import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false
};

const slice = createSlice({
  name: 'Delete',
  initialState,
  reducers: {
    ChangeDeleteValue: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { ChangeDeleteValue } = slice.actions;
export default slice.reducer;
