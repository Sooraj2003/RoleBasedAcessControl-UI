import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [
      { id: 1, name: 'Meghana', role: 'Admin', status: 'Active' },
      { id: 2, name: 'Sooraj', role: 'User', status: 'Inactive' },
    ],
  },
  reducers: {
    
      addUser: (state, action) => {
        const newUser = {
          ...action.payload,
          id: uuid(), // Automatically assign a unique ID
        };
        state.users.push(newUser);
      },
    deleteUser(state, action) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    toggleStatus(state, action) {
      const userIndex = state.users.findIndex((user) => user.id === action.payload);
      if (userIndex !== -1) {
        state.users[userIndex].status =
          state.users[userIndex].status === 'Active' ? 'Inactive' : 'Active';
      }
    },
    updateUser(state, action) {
      const { id, name, role } = action.payload;
      const user = state.users.find((user) => user.id === id);
      if (user) {
        user.name = name;
        user.role = role;
      }
    },
  },
});

export const { addUser, deleteUser, toggleStatus, updateUser } = usersSlice.actions;

export default usersSlice.reducer;
