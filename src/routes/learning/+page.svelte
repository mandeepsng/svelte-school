<script lang="ts">
  import ProgressIndicator from '$lib/components/ProgressIndicator.svelte';
  import ModuleCard from '$lib/components/ModuleCard.svelte';
  import { modules } from '$lib/stores/progress';
</script>

<div class="learning-page">
  <div class="hero">
    <h1>Learning Modules</h1>
    <p>Track your progress as you learn Svelte and SvelteKit!</p>
    <ProgressIndicator />
  </div>
  
  <div class="modules-container">
    <ModuleCard 
      id="basics"
      title="Svelte Basics"
      description="Learn the fundamentals of Svelte components, reactivity, and template syntax."
    />
    
    <ModuleCard 
      id="lifecycle"
      title="Component Lifecycle"
      description="Understand how components are created, updated, and destroyed in Svelte."
    />
    
    <ModuleCard 
      id="events"
      title="Events and Bindings"
      description="Master event handling and two-way binding in Svelte applications."
    />
    
    <ModuleCard 
      id="stores"
      title="Svelte Stores"
      description="Implement global state management with Svelte's built-in store mechanism."
    />
    
    <ModuleCard 
      id="advanced"
      title="Advanced Techniques"
      description="Explore advanced Svelte features like actions, animations, and custom elements."
    />
    
    <ModuleCard 
      id="routing"
      title="SvelteKit Routing and SSR"
      description="Learn how SvelteKit handles routing and server-side rendering."
    />
    
    <ModuleCard 
      id="authentication"
      title="Authentication with Laravel"
      description="Implement user authentication with Laravel Sanctum and Svelte."
    />
    
    <ModuleCard 
      id="api-integration"
      title="API Integration Techniques"
      description="Connect your Svelte app to backend APIs and handle data efficiently."
    />
    
    <ModuleCard 
      id="forms"
      title="Form Handling and Validation"
      description="Build and validate forms with Svelte's powerful binding system."
    />
    
    <ModuleCard 
      id="realtime"
      title="Real-time Features with WebSockets"
      description="Implement real-time features using WebSockets and Laravel Echo."
    />
  </div>
</div>

<style>
  .learning-page {
    max-width: 900px;
    margin: 0 auto;
  }
  
  .hero {
    margin-bottom: 2rem;
    text-align: center;
    padding: 2rem 0;
  }
  
  h1 {
    margin-top: 0;
  }
  
  .hero p {
    font-size: 1.25rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 1rem auto;
  }
  
  .modules-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  @media (min-width: 768px) {
    .modules-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style> 