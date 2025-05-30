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
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  h1 {
    color: #ff3e00;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .back-link {
    margin-bottom: 2rem;
  }

  .back-link a {
    color: #0066cc;
    text-decoration: none;
  }

  .example-section {
    margin-bottom: 3rem;
  }

  h2 {
    color: #333;
    border-bottom: 2px solid #eee;
    padding-bottom: 0.5rem;
  }

  .demo-box {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1rem 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  button {
    background-color: #ff3e00;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 0.5rem;
  }

  button:hover {
    background-color: #e03600;
  }

  input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 0.5rem;
    width: 200px;
  }

  .highlight {
    color: #ff3e00;
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
    background-color: #ffebe6;
    color: #d73a49;
  }

  .status.medium {
    background-color: #fff5b1;
    color: #735c0f;
  }

  .status.low {
    background-color: #e6fffa;
    color: #00a3c4;
  }

  .next-steps {
    background-color: #f0f9ff;
    border-left: 4px solid #0066cc;
    padding: 1.5rem;
    border-radius: 0 8px 8px 0;
  }

  .next-steps ul {
    padding-left: 1.5rem;
  }

  .next-steps a {
    color: #0066cc;
    text-decoration: none;
  }

  .next-steps a:hover {
    text-decoration: underline;
  }
</style> 