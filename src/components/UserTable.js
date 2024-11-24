import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, toggleStatus, updateUser } from '../store/usersSlice';

const UserTable = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [statusFilter, setStatusFilter] = useState('All'); // State for status filter
  const [editUser, setEditUser] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedRole, setEditedRole] = useState('');

  const handleEdit = (user) => {
    setEditUser(user);
    setEditedName(user.name);
    setEditedRole(user.role);
  };

  const handleSave = () => {
    dispatch(updateUser({ id: editUser.id, name: editedName, role: editedRole }));
    setEditUser(null);
  };

  // Extract unique roles from users
  const uniqueRoles = [...new Set(users.map((user) => user.role))];

  // Filter users based on search term and status filter
  const filteredUsers = users.filter((user) => {
    const matchesSearchTerm = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' || user.status === statusFilter;
    return matchesSearchTerm && matchesStatus;
  });

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-xl font-bold mb-4">User Management</h2>

      {/* Search input and status filter */}
      <div className="mb-4 flex flex-wrap items-center space-x-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md shadow-md">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-gray-800'
                  } hover:bg-gray-100 dark:hover:bg-gray-700 transition`}
                >
                  <td className="px-4 py-2 border-t border-gray-300 dark:border-gray-600">
                    {user.name}
                  </td>
                  <td className="px-4 py-2 border-t border-gray-300 dark:border-gray-600">
                    {user.role}
                  </td>
                  <td className="px-4 py-2 border-t border-gray-300 dark:border-gray-600">
                    <span
                      className={`px-2 py-1 text-sm font-medium rounded ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                          : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-t border-gray-300 dark:border-gray-600 flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
                    <button
                      onClick={() => dispatch(toggleStatus(user.id))}
                      className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 transition"
                    >
                      Toggle Status
                    </button>
                    <button
                      onClick={() => handleEdit(user)}
                      className="px-3 py-1 text-sm font-medium text-white bg-yellow-500 rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => dispatch(deleteUser(user.id))}
                      className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-6 text-center text-gray-600 dark:text-gray-300">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editUser && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-96">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-200">Edit User</h3>
            <label className="block mb-2">
              <span className="text-gray-700 dark:text-gray-200">Name</span>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700 dark:text-gray-200">Role</span>
              <select
                value={editedRole}
                onChange={(e) => setEditedRole(e.target.value)}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2"
              >
                {uniqueRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditUser(null)}
                className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
