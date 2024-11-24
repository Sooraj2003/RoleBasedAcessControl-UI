import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteRole, updateRole } from '../store/rolesSlice';

const RoleTable = () => {
  const roles = useSelector((state) => state.roles.roles);
  const dispatch = useDispatch();

  // State to track the editing role
  const [editRoleId, setEditRoleId] = useState(null);
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState('');

  const handleEdit = (role) => {
    setEditRoleId(role.id);
    setRoleName(role.name);
    setPermissions(role.permissions.join(', '));  // Convert array to string for easier editing
  };

  const handleSave = () => {
    const updatedPermissions = permissions.split(',').map(permission => permission.trim()); // Convert back to array
    dispatch(updateRole({ id: editRoleId, name: roleName, permissions: updatedPermissions }));
    setEditRoleId(null); // Reset editing state
    setRoleName('');
    setPermissions('');
  };

  return (
    <div className="overflow-x-auto mt-4">
      <h2 className="text-lg font-bold mb-2">Roles</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2">Role Name</th>
              <th className="border border-gray-200 px-4 py-2">Permissions</th>
              <th className="border border-gray-200 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="border-t">
                <td className="border border-gray-200 px-4 py-2">
                  {role.id === editRoleId ? (
                    <input
                      type="text"
                      value={roleName}
                      onChange={(e) => setRoleName(e.target.value)}
                      className="p-2 border border-gray-300 rounded w-full"
                    />
                  ) : (
                    role.name
                  )}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {role.id === editRoleId ? (
                    <input
                      type="text"
                      value={permissions}
                      onChange={(e) => setPermissions(e.target.value)}
                      className="p-2 border border-gray-300 rounded w-full"
                      placeholder="Enter permissions separated by commas"
                    />
                  ) : (
                    role.permissions.join(', ') // Display permissions as a comma-separated string
                  )}
                </td>
                <td className="border border-gray-200 px-4 py-2 flex gap-2">
                  {role.id === editRoleId ? (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                      onClick={() => handleEdit(role)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => dispatch(deleteRole(role.id))}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleTable;
