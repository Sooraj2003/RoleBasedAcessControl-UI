import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRole } from '../store/rolesSlice';

const RoleForm = () => {
  const [name, setName] = useState('');
  const [permissions, setPermissions] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && permissions) {
      const permissionArray = permissions.split(',').map((perm) => perm.trim());
      dispatch(addRole({ name, permissions: permissionArray }));
      setName('');
      setPermissions('');
    }
  };

  return (
    <form className="mt-6 px-4 sm:px-6 lg:px-8" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Add Role</h2>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <input
          type="text"
          placeholder="Role Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full sm:w-64"
        />
        <input
          type="text"
          placeholder="Permissions (comma-separated)"
          value={permissions}
          onChange={(e) => setPermissions(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full sm:w-64"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded mt-4 sm:mt-0"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default RoleForm;
