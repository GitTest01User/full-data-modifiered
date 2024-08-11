import { configureStore } from '@reduxjs/toolkit';

import DataReducer from './UserLoginSlice';
import DataTrashReducer from './TrashSlice';
import DataDeleteReducer from './DeleteSlice';
var store = configureStore({
  reducer: {
    Login: DataReducer,
    Trash: DataTrashReducer,
    Delete: DataDeleteReducer
  }
});
export default store;
