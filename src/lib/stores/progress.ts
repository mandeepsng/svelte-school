import { writable } from 'svelte/store';

// Define the available modules
export const modules = [
  { id: 'basics', title: 'Svelte Basics' },
  { id: 'lifecycle', title: 'Component Lifecycle' },
  { id: 'events', title: 'Events and Bindings' },
  { id: 'stores', title: 'Svelte Stores' },
  { id: 'advanced', title: 'Advanced Techniques' },
  { id: 'routing', title: 'SvelteKit Routing and SSR' },
  { id: 'authentication', title: 'Authentication with Laravel' },
  { id: 'api-integration', title: 'API Integration Techniques' },
  { id: 'forms', title: 'Form Handling and Validation' },
  { id: 'realtime', title: 'Real-time Features with WebSockets' },
];

type Progress = {
  [moduleId: string]: {
    completed: boolean;
    lastVisited: string; // ISO date string
  };
};

function createProgressStore() {
  // Initialize from localStorage if available
  const storedProgress = typeof localStorage !== 'undefined' 
    ? JSON.parse(localStorage.getItem('module-progress') || '{}') 
    : {};
    
  // Ensure all modules have progress entries
  const initialProgress: Progress = modules.reduce((acc, module) => {
    return {
      ...acc,
      [module.id]: storedProgress[module.id] || {
        completed: false,
        lastVisited: ''
      }
    };
  }, {});
  
  const { subscribe, set, update } = writable<Progress>(initialProgress);
  
  return {
    subscribe,
    
    markVisited: (moduleId: string) => {
      update(progress => {
        const updatedProgress = {
          ...progress,
          [moduleId]: {
            ...progress[moduleId],
            lastVisited: new Date().toISOString()
          }
        };
        
        // Save to localStorage
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('module-progress', JSON.stringify(updatedProgress));
        }
        
        return updatedProgress;
      });
    },
    
    markCompleted: (moduleId: string, isCompleted = true) => {
      update(progress => {
        const updatedProgress = {
          ...progress,
          [moduleId]: {
            ...progress[moduleId],
            completed: isCompleted,
            lastVisited: new Date().toISOString()
          }
        };
        
        // Save to localStorage
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('module-progress', JSON.stringify(updatedProgress));
        }
        
        return updatedProgress;
      });
    },
    
    reset: () => {
      const resetProgress: Progress = modules.reduce((acc, module) => {
        return {
          ...acc,
          [module.id]: {
            completed: false,
            lastVisited: ''
          }
        };
      }, {});
      
      set(resetProgress);
      
      // Save to localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('module-progress', JSON.stringify(resetProgress));
      }
    }
  };
}

export const progress = createProgressStore(); 