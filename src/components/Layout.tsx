// @ts-nocheck

import React from "react";
interface LayoutProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ darkMode, toggleDarkMode, children }) => {
  // ...shell controls (e.g., dark mode button) here...
  return <div>{children}</div>;
};
export default Layout;

