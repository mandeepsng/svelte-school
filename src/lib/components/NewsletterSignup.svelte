<script>
  import { fly } from 'svelte/transition';
  import { theme } from '$lib/stores/theme';
  
  let email = '';
  let submitting = false;
  let success = false;
  let error = '';
  
  async function handleSubmit() {
    if (!email) {
      error = 'Email is required';
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error = 'Please enter a valid email address';
      return;
    }
    
    error = '';
    submitting = true;
    
    // Simulate API call
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      success = true;
      email = '';
    } catch (err) {
      error = 'An error occurred. Please try again.';
    } finally {
      submitting = false;
    }
  }
</script>

<div class="newsletter-container">
  <div class="newsletter-content">
    <h3>Stay Updated</h3>
    <p>Get the latest Svelte tips, tutorials, and updates delivered to your inbox.</p>
    
    {#if !success}
      <form on:submit|preventDefault={handleSubmit}>
        <div class="input-group">
          <input
            type="email"
            placeholder="your@email.com"
            bind:value={email}
            disabled={submitting}
            aria-label="Email address"
          />
          <button type="submit" disabled={submitting}>
            {#if submitting}
              <div class="spinner"></div>
            {:else}
              Subscribe
            {/if}
          </button>
        </div>
        {#if error}
          <p class="error" transition:fly={{ y: -10, duration: 150 }}>{error}</p>
        {/if}
      </form>
    {:else}
      <div class="success" transition:fly={{ y: -10, duration: 300 }}>
        <div class="checkmark">✓</div>
        <p>Thank you for subscribing!</p>
      </div>
    {/if}
  </div>
</div>

<style>
  .newsletter-container {
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 1.5rem;
    color: var(--text-color);
    box-shadow: 0 4px 12px var(--shadow-color);
  }
  
  .newsletter-content {
    max-width: 500px;
    margin: 0 auto;
  }
  
  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--heading-color);
  }
  
  p {
    margin: 0 0 1.5rem;
    color: var(--text-secondary);
  }
  
  .input-group {
    display: flex;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid var(--border-color);
    background-color: var(--bg-color);
  }
  
  input {
    flex: 1;
    padding: 0.8rem 1rem;
    border: none;
    font-size: 1rem;
    outline: none;
    color: var(--text-color);
    background-color: var(--bg-color);
  }
  
  button {
    background-color: var(--accent-color);
    color: white;
    border: none;
    padding: 0 1.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
    min-width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  button:hover:not(:disabled) {
    background-color: var(--accent-color-dark);
  }
  
  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .error {
    color: var(--error-color);
    font-size: 0.85rem;
    margin-top: 0.5rem;
    background-color: rgba(239, 68, 68, 0.1);
    padding: 0.3rem 0.7rem;
    border-radius: 4px;
    display: inline-block;
  }
  
  .success {
    background-color: rgba(16, 185, 129, 0.1);
    padding: 1.2rem;
    border-radius: 6px;
    text-align: center;
  }
  
  .checkmark {
    width: 40px;
    height: 40px;
    background-color: var(--success-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 0.8rem;
    font-size: 1.3rem;
    font-weight: bold;
  }
  
  .spinner {
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 0.8s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  @media (max-width: 768px) {
    .input-group {
      flex-direction: column;
    }
    
    input {
      border-bottom: 1px solid var(--border-color);
    }
    
    button {
      padding: 0.8rem;
    }
  }
</style> 