// @ts-nocheck

export const getThemeClasses = (darkMode) => {
  return {
    bgClass: darkMode ? 'bg-black' : 'bg-white',
    cardBgClass: darkMode ? 'bg-zinc-900' : 'bg-zinc-50',
    textPrimaryClass: darkMode ? 'text-white' : 'text-black',
    textSecondaryClass: darkMode ? 'text-zinc-400' : 'text-zinc-600',
    borderClass: darkMode ? 'border-zinc-800' : 'border-zinc-200',
  };
};

