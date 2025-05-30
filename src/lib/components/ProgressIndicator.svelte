<script lang="ts">
  import { progress, modules } from '$lib/stores/progress';
  
  // Calculate completion percentage
  $: completedCount = Object.values($progress).filter(module => module.completed).length;
  $: totalModules = modules.length;
  $: completionPercentage = Math.round((completedCount / totalModules) * 100);
</script>

<div class="progress-container">
  <div class="progress-text">
    <span class="percentage">{completionPercentage}%</span>
    <span class="modules">{completedCount} of {totalModules} modules completed</span>
  </div>
  <div class="progress-bar">
    <div class="progress-fill" style="width: {completionPercentage}%"></div>
  </div>
</div>

<style>
  .progress-container {
    margin: 1.5rem 0;
    width: 100%;
  }
  
  .progress-text {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  
  .percentage {
    font-weight: bold;
    color: var(--accent-color);
  }
  
  .progress-bar {
    height: 8px;
    background-color: var(--bg-secondary);
    border-radius: 4px;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background-color: var(--accent-color);
    border-radius: 4px;
    transition: width 0.3s ease;
  }
</style> 