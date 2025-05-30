<script lang="ts">
  import { progress } from '$lib/stores/progress';
  import { fly } from 'svelte/transition';
  
  export let id: string;
  export let title: string;
  export let description: string;
  
  $: moduleProgress = $progress[id];
  $: isCompleted = moduleProgress?.completed;
  $: lastVisited = moduleProgress?.lastVisited 
    ? new Date(moduleProgress.lastVisited).toLocaleDateString() 
    : null;
</script>

<a 
  href="/learning/{id}" 
  class="module-card" 
  class:completed={isCompleted}
  transition:fly={{ y: 20, duration: 300 }}
  on:mouseenter={() => progress.markVisited(id)}
>
  <div class="card-content">
    <h3>{title}</h3>
    <p>{description}</p>
    
    <div class="status">
      {#if isCompleted}
        <span class="completed-badge">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          Completed
        </span>
      {:else if lastVisited}
        <span class="last-visited">Last visited: {lastVisited}</span>
      {:else}
        <span class="not-started">Not started</span>
      {/if}
    </div>
  </div>
</a>

<style>
  .module-card {
    display: block;
    background-color: var(--card-bg);
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    text-decoration: none;
    color: var(--text-color);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border-left: 4px solid transparent;
  }
  
  .module-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  .module-card.completed {
    border-left-color: var(--success-color);
  }
  
  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--heading-color);
  }
  
  p {
    color: var(--text-secondary);
    margin-bottom: 1rem;
  }
  
  .status {
    font-size: 0.85rem;
    display: flex;
    align-items: center;
  }
  
  .completed-badge {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    color: var(--success-color);
    font-weight: 500;
  }
  
  .last-visited {
    color: var(--text-muted);
    font-style: italic;
  }
  
  .not-started {
    color: var(--text-muted);
  }
</style> 