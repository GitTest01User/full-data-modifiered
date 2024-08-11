import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false
};

const slice = createSlice({
  name: 'Trash',
  initialState,
  reducers: {
    ChangeTrashValue: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { ChangeTrashValue } = slice.actions;
export default slice.reducer;
