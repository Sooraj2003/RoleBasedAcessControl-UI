import { createSlice } from '@reduxjs/toolkit';

const rolesSlice = createSlice({
  name: 'roles',
  initialState: {
    roles: [
      { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
      { id: 2, name: 'Editor', permissions: ['Read', 'Write'] },
    ],
  },
  reducers: {
    addRole: (state, action) => {
      state.roles.push(action.payload);
    },
    deleteRole: (state, action) => {
      state.roles = state.roles.filter((role) => role.id !== action.payload);
    },
    updateRole: (state, action) => {
      const roleIndex = state.roles.findIndex((role) => role.id === action.payload.id);
      if (roleIndex !== -1) {
        state.roles[roleIndex] = {
          ...state.roles[roleIndex],
          ...action.payload,
        };
      }
    },
  },
});

export const { addRole, deleteRole, updateRole } = rolesSlice.actions;

export default rolesSlice.reducer;
