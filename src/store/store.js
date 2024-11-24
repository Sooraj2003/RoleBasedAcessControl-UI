import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import rolesReducer from './rolesSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    roles: rolesReducer,
  },
});

export default store;
