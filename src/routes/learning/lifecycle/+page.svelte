<script lang="ts">
  import { onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte';
  
  let mountTime = '';
  let updateCount = 0;
  let timer: ReturnType<typeof setInterval>;
  let seconds = 0;
  
  // This runs when the component is mounted to the DOM
  onMount(() => {
    mountTime = new Date().toLocaleTimeString();
    console.log('Component mounted');
    
    // Start a timer
    timer = setInterval(() => {
      seconds += 1;
    }, 1000);
    
    // Return a function to be called when the component is destroyed
    return () => {
      console.log('onMount cleanup');
      // This is redundant with onDestroy, but shown for example
    };
  });
  
  // This runs right before the component updates
  beforeUpdate(() => {
    console.log('Before component update');
  });
  
  // This runs after the component updates
  afterUpdate(() => {
    updateCount += 1;
    console.log('After component update');
  });
  
  // This runs when the component is destroyed
  onDestroy(() => {
    console.log('Component destroyed');
    clearInterval(timer);
  });
  
  function forceUpdate() {
    // Just modifying a variable to trigger an update
    seconds = seconds;
  }
</script>

<svelte:head>
  <title>Component Lifecycle | Svelte Learning Path</title>
</svelte:head>

<div class="container">
  <h1>Component Lifecycle</h1>
  <p class="back-link"><a href="/">← Back to Home</a></p>

  <section class="example-section">
    <h2>Lifecycle Methods in Svelte</h2>
    <p>
      Svelte provides several lifecycle methods that allow you to run code at specific times during a component's existence.
    </p>

    <div class="demo-box">
      <h3>Component Status</h3>
      <ul class="status-list">
        <li>Mounted at: <span class="highlight">{mountTime}</span></li>
        <li>Update count: <span class="highlight">{updateCount}</span></li>
        <li>Timer (seconds): <span class="highlight">{seconds}</span></li>
      </ul>
      
      <button on:click={forceUpdate}>Force Update</button>
      
      <div class="console-message">
        <p>Open the browser console (F12) to see lifecycle method logs.</p>
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>onMount</h2>
    <p>
      The <code>onMount</code> function runs after the component is first rendered to the DOM. 
      This is the ideal place to fetch data, set up timers, or add event listeners.
    </p>
  </section>

  <section class="example-section">
    <h2>onDestroy</h2>
    <p>
      The <code>onDestroy</code> function runs when the component is removed from the DOM.
      This is where you should clean up any resources that might continue running.
    </p>
  </section>

  <section class="example-section">
    <h2>beforeUpdate and afterUpdate</h2>
    <p>
      These functions run before and after the DOM is updated as a result of state changes.
    </p>
  </section>

  <div class="next-steps">
    <h2>Next Steps</h2>
    <p>Now that you understand component lifecycle, check out:</p>
    <ul>
      <li><a href="/learning/events">Events and Bindings</a> - Learn about custom events and different binding types</li>
      <li><a href="/learning/stores">Svelte Stores</a> - Manage state across components</li>
    </ul>
  </div>
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    color: var(--accent-color);
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .back-link {
    margin-bottom: 2rem;
  }

  .back-link a {
    color: var(--accent-color);
    text-decoration: none;
  }

  .example-section {
    margin-bottom: 3rem;
  }

  h2 {
    color: var(--heading-color);
    border-bottom: 2px solid var(--border-color);
    padding-bottom: 0.5rem;
  }

  .demo-box {
    background-color: var(--card-bg);
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1rem 0;
    box-shadow: 0 2px 8px var(--shadow-color);
  }

  button {
    background-color: var(--accent-color);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 0.5rem;
  }

  button:hover {
    background-color: var(--accent-color-dark);
  }

  .highlight {
    color: var(--accent-color);
    font-weight: bold;
  }

  .status-list {
    list-style-type: none;
    padding-left: 0;
  }

  .status-list li {
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border-color);
  }

  .console-message {
    background-color: var(--bg-secondary);
    padding: 0.8rem;
    margin: 1rem 0;
    border-radius: 4px;
    font-size: 0.9rem;
    border-left: 3px solid var(--warning-color);
  }

  code {
    background-color: var(--bg-secondary);
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
  }

  .next-steps {
    background-color: var(--bg-secondary);
    border-left: 4px solid var(--accent-color);
    padding: 1.5rem;
    border-radius: 0 8px 8px 0;
  }

  .next-steps ul {
    padding-left: 1.5rem;
  }

  .next-steps a {
    color: var(--accent-color);
    text-decoration: none;
  }

  .next-steps a:hover {
    text-decoration: underline;
  }
</style> 