<script lang="ts">
  import { page } from '$app/stores';
  import { slide } from 'svelte/transition';
  import ModuleCompletion from '$lib/components/ModuleCompletion.svelte';
  import { progress, modules } from '$lib/stores/progress';
  
  // Get the current module ID from the URL
  $: moduleId = $page.params.slug;
  
  // Find the current module's title
  $: moduleTitle = modules.find(m => m.id === moduleId)?.title || 'Learning Module';
  
  // Determine the next and previous modules
  $: currentIndex = modules.findIndex(m => m.id === moduleId);
  $: prevModule = currentIndex > 0 ? modules[currentIndex - 1] : null;
  $: nextModule = currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;
  
  // Mark the module as visited when loaded
  $: if (moduleId) {
    progress.markVisited(moduleId);
  }
</script>

<div class="module-container">
  <header class="module-header">
    <h1>{moduleTitle}</h1>
    
    <div class="module-navigation">
      {#if prevModule}
        <a href="/learning/{prevModule.id}" class="nav-link prev">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Previous: {prevModule.title}
        </a>
      {/if}
      
      {#if nextModule}
        <a href="/learning/{nextModule.id}" class="nav-link next">
          Next: {nextModule.title}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      {/if}
    </div>
  </header>

  <div class="module-content" transition:slide={{ duration: 300 }}>
    <slot />
  </div>
  
  <ModuleCompletion moduleId={moduleId} />
  
  <div class="module-footer">
    <a href="/learning" class="back-to-modules">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
      Back to Modules
    </a>
    
    <div class="module-navigation">
      {#if prevModule}
        <a href="/learning/{prevModule.id}" class="nav-button prev">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Previous
        </a>
      {/if}
      
      {#if nextModule}
        <a href="/learning/{nextModule.id}" class="nav-button next">
          Next
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      {/if}
    </div>
  </div>
</div>

<style>
  .module-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .module-header {
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 1rem;
  }
  
  h1 {
    margin-top: 0;
    font-size: 2rem;
  }
  
  .module-navigation {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.9rem;
    padding: 0.5rem 0;
    max-width: 45%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .nav-link:hover {
    color: var(--accent-color);
    text-decoration: none;
  }
  
  .nav-link.next {
    margin-left: auto;
  }
  
  .module-content {
    min-height: 300px;
  }
  
  .module-footer {
    margin-top: 3rem;
    border-top: 1px solid var(--border-color);
    padding-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .back-to-modules {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 500;
    width: fit-content;
    margin: 0 auto;
  }
  
  .back-to-modules:hover {
    color: var(--accent-color);
    text-decoration: none;
  }
  
  .nav-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--bg-secondary);
    color: var(--text-color);
    text-decoration: none;
    padding: 0.75rem 1.25rem;
    border-radius: 0.375rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }
  
  .nav-button:hover {
    background-color: var(--hover-bg);
    transform: translateY(-2px);
    text-decoration: none;
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: 1.5rem;
    }
    
    .nav-link {
      font-size: 0.8rem;
    }
  }
</style> 