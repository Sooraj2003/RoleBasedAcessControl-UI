import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../store/usersSlice';

const UserForm = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const roles = useSelector((state) => state.roles.roles);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && role) {
      dispatch(addUser({ name, role, status: 'Active' })); // No need to pass ID
      setName('');
      setRole('');
    }
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-4">Add User</h2>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full sm:w-1/3"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full sm:w-1/3"
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default UserForm;
