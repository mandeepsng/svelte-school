<script lang="ts">
  import { progress } from '$lib/stores/progress';
  import { fly } from 'svelte/transition';
  
  export let moduleId: string;
  
  $: isCompleted = $progress[moduleId]?.completed || false;
  
  function toggleCompletion() {
    progress.markCompleted(moduleId, !isCompleted);
  }
</script>

<div class="module-completion" transition:fly={{ y: 10, duration: 200 }}>
  <button 
    class="completion-button" 
    class:completed={isCompleted}
    on:click={toggleCompletion} 
    aria-label={isCompleted ? "Mark as incomplete" : "Mark as completed"}
  >
    {#if isCompleted}
      <div class="completed-indicator">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>Completed</span>
      </div>
    {:else}
      <div class="incomplete-indicator">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span>Mark as completed</span>
      </div>
    {/if}
  </button>
</div>

<style>
  .module-completion {
    margin: 2rem 0;
    display: flex;
    justify-content: center;
  }
  
  .completion-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    border-radius: 2rem;
    font-weight: 500;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    background-color: var(--bg-secondary);
    color: var(--text-secondary);
    border: 1px solid var(--border-color);
  }
  
  .completion-button:hover {
    background-color: var(--hover-bg);
    transform: translateY(-2px);
  }
  
  .completion-button.completed {
    background-color: var(--success-color);
    color: white;
    border-color: var(--success-color);
  }
  
  .completed-indicator, .incomplete-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .completed-indicator svg, .incomplete-indicator svg {
    transition: transform 0.3s ease;
  }
  
  .completion-button:hover svg {
    transform: scale(1.1);
  }
</style> 