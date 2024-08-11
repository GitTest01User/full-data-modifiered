import { createSlice } from '@reduxjs/toolkit';
import secureLocalStorage from 'react-secure-storage';

const initialState = {
  value: JSON.parse(secureLocalStorage.getItem('Login')) || {
    isActive: false
  }
};

const slice = createSlice({
  name: 'Login',
  initialState,
  reducers: {
    ChangeUserInfo: (state, action) => {
      secureLocalStorage.setItem('Login', JSON.stringify(action.payload));
      state.value = action.payload;
    }
  }
});

export const { ChangeUserInfo } = slice.actions;
export default slice.reducer;
