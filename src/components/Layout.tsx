

import React from "react";
interface LayoutProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ darkMode, toggleDarkMode, children }) => {
  const bgClass = darkMode ? 'bg-black' : 'bg-white';
  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      <header className="w-full py-4 px-4 sm:px-8 flex items-center justify-between">
        <h1 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>Memento Mori</h1>
        <button
          onClick={toggleDarkMode}
          className={`ml-4 p-2 rounded-full ${darkMode ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-600 hover:text-neutral-900'} transition-colors`}
          title="Toggle dark mode"
        >
          {darkMode ? <span>🌞</span> : <span>🌙</span>}
        </button>
      </header>
      <main className="max-w-5xl mx-auto p-4 sm:p-8 transition-all duration-300">
        {children}
      </main>
    </div>
  );
};
export default Layout;

