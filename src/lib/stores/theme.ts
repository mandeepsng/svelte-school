import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';

// Initialize theme from localStorage or system preference
function createThemeStore() {
  // Check localStorage first
  const storedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') as Theme : null;
  
  // If no stored theme, check system preference
  const systemPrefersDark = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-color-scheme: dark)').matches 
    : false;
    
  // Set initial theme
  const initialTheme: Theme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
  
  const { subscribe, set, update } = writable<Theme>(initialTheme);
  
  return {
    subscribe,
    toggleTheme: () => {
      update(currentTheme => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        // Save to localStorage
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('theme', newTheme);
        }
        return newTheme;
      });
    },
    setTheme: (theme: Theme) => {
      set(theme);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('theme', theme);
      }
    }
  };
}

export const theme = createThemeStore(); 