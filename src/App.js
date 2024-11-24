import React from 'react';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import RoleForm from './components/RoleForm'; // Import RoleForm
import RoleTable from './components/RoleTable'; // Import RoleTable
import DarkModeToggle from './components/DarkModeToggle';

const App = () => {
  return (
    <div className="min-h-screen transition bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-500">
      <DarkModeToggle />
      <div className="container mx-auto p-4">
        <h1 className="text-xl md:text-2xl font-bold mb-6">User & Role Management</h1>
        
        {/* Roles Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Manage Roles</h2>
          <RoleForm />
          <RoleTable />
        </section>

        {/* Users Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
          <UserForm />
          <UserTable />
        </section>
      </div>
    </div>
  );
};

export default App;
