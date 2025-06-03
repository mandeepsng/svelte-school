<script>
  // Reactivity example
  let count = 0;
  let name = "Learner";
  
  // Reactive declarations - automatically update when dependencies change
  $: doubled = count * 2;
  $: greeting = `Hello, ${name}!`;
  
  // A function to increment the count
  function incrementCount() {
    count += 1;
  }
  
  // Array for binding demonstration
  let fruits = ['Apple', 'Banana', 'Cherry'];
  let newFruit = '';
  
  function addFruit() {
    if (newFruit.trim()) {
      fruits = [...fruits, newFruit]; // Create a new array for reactivity
      newFruit = ''; // Clear the input
    }
  }
</script>

<svelte:head>
  <title>Svelte Basics | Learning Path</title>
</svelte:head>

<div class="container">
  <h1>Svelte Basics</h1>
  <p class="back-link"><a href="/">← Back to Home</a></p>

  <section class="example-section">
    <h2>1. Reactive Variables</h2>
    <p>Svelte automatically updates the DOM when your component's state changes.</p>
    
    <div class="demo-box">
      <h3>Simple Counter</h3>
      <p>Current count: <span class="highlight">{count}</span></p>
      <p>Doubled value: <span class="highlight">{doubled}</span></p>
      <button on:click={incrementCount}>Increment</button>
    </div>
  </section>

  <section class="example-section">
    <h2>2. Two-way Binding</h2>
    <p>Svelte makes it easy to bind form fields to variables.</p>
    
    <div class="demo-box">
      <h3>Name Input</h3>
      <p>{greeting}</p>
      <input bind:value={name} placeholder="Enter your name">
    </div>
  </section>

  <section class="example-section">
    <h2>3. Array Reactivity</h2>
    <p>Svelte can track changes to arrays and objects when you use assignment.</p>
    
    <div class="demo-box">
      <h3>Fruit List</h3>
      <ul class="fruit-list">
        {#each fruits as fruit, i}
          <li>{i + 1}. {fruit}</li>
        {/each}
      </ul>
      
      <div class="add-fruit">
        <input bind:value={newFruit} placeholder="Add a fruit">
        <button on:click={addFruit}>Add</button>
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>4. Conditional Rendering</h2>
    <p>Svelte provides easy ways to conditionally render content.</p>
    
    <div class="demo-box">
      <h3>Status Based on Count</h3>
      
      {#if count > 10}
        <p class="status high">Count is high!</p>
      {:else if count > 5}
        <p class="status medium">Count is getting there!</p>
      {:else}
        <p class="status low">Count is still low.</p>
      {/if}
    </div>
  </section>

  <div class="next-steps">
    <h2>Next Steps</h2>
    <p>Now that you've learned the basics, check out:</p>
    <ul>
      <li><a href="/learning/lifecycle">Component Lifecycle</a> - Learn how to use onMount, onDestroy, and other lifecycle methods</li>
      <li><a href="/learning/events">Events and Bindings</a> - Advanced event handling in Svelte</li>
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

  input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    margin-right: 0.5rem;
    width: 200px;
    background-color: var(--bg-color);
    color: var(--text-color);
  }

  .highlight {
    color: var(--accent-color);
    font-weight: bold;
  }

  .fruit-list {
    list-style-type: none;
    padding-left: 0;
  }

  .fruit-list li {
    padding: 0.3rem 0;
  }

  .add-fruit {
    display: flex;
    margin-top: 1rem;
  }

  .status {
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    display: inline-block;
  }

  .status.high {
    background-color: rgba(239, 68, 68, 0.1);
    color: var(--error-color);
  }

  .status.medium {
    background-color: rgba(245, 158, 11, 0.1);
    color: var(--warning-color);
  }

  .status.low {
    background-color: rgba(59, 130, 246, 0.1);
    color: var(--info-color);
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