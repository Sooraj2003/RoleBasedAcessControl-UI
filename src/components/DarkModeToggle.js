import React, { useEffect } from 'react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = React.useState(() => {
    // Check for saved mode in localStorage or default to light mode
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      className="fixed top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 sm:p-3 md:p-4 rounded-md shadow-md transition transform hover:scale-105 text-sm sm:text-base md:text-lg"
    >
      {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;
