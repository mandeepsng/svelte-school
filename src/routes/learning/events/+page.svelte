<script lang="ts">
  // Event handling
  function handleClick() {
    alert('Button was clicked!');
  }
  
  // Event modifiers
  function handleRightClick() {
    alert('Right click detected!');
  }
  
  // Custom events
  function handleCustomEvent(event: CustomEvent<{message: string}>) {
    alert(`Custom event received with data: ${event.detail.message}`);
  }
  
  function dispatchCustomEvent() {
    const customEvent = new CustomEvent('mycustomevent', {
      detail: { message: 'Hello from custom event!' }
    });
    document.dispatchEvent(customEvent);
  }
  
  // Binding examples
  let name = '';
  let agreed = false;
  let selectedColor = 'red';
  let colors = ['red', 'green', 'blue', 'yellow'];
  let multipleColors: string[] = [];
  let textareaContent = '';
  let number = 0;
  
  // Component will listen for the custom event when mounted
  import { onMount, onDestroy } from 'svelte';
  
  onMount(() => {
    // Add event listener for custom event
    document.addEventListener('mycustomevent', handleCustomEvent as EventListener);
  });
  
  onDestroy(() => {
    // Remove event listener when component is destroyed
    document.removeEventListener('mycustomevent', handleCustomEvent as EventListener);
  });
</script>

<svelte:head>
  <title>Events and Bindings | Svelte Learning Path</title>
</svelte:head>

<div class="container">
  <h1>Events and Bindings</h1>
  <p class="back-link"><a href="/">← Back to Home</a></p>

  <section class="example-section">
    <h2>Event Handling</h2>
    <p>Svelte provides a simple way to handle DOM events with the <code>on:</code> directive.</p>
    
    <div class="demo-box">
      <h3>Basic Event Handling</h3>
      
      <button on:click={handleClick}>Click Me</button>
      
      <p class="note">The button above uses a handler function for the click event.</p>
      
      <button on:click={() => alert('Inline handler!')}>Inline Handler</button>
      
      <p class="note">This button uses an inline handler function.</p>
    </div>
  </section>

  <section class="example-section">
    <h2>Event Modifiers</h2>
    <p>Svelte provides event modifiers that make handling events more convenient.</p>
    
    <div class="demo-box">
      <h3>Common Event Modifiers</h3>
      
      <button on:contextmenu|preventDefault={handleRightClick}>
        Right Click Me (Prevented Default)
      </button>
      
      <p class="note">The <code>preventDefault</code> modifier prevents the default context menu.</p>
      
      <button on:click|once={() => alert('This alert appears only once!')}>
        Click Once Only
      </button>
      
      <p class="note">The <code>once</code> modifier ensures the event only fires once.</p>
      
      <div class="modifiers-list">
        <p>Available modifiers:</p>
        <ul>
          <li><code>preventDefault</code> - Calls event.preventDefault() before running the handler</li>
          <li><code>stopPropagation</code> - Calls event.stopPropagation()</li>
          <li><code>passive</code> - Improves scrolling performance on touch/wheel events</li>
          <li><code>capture</code> - Fires the handler during the capture phase instead of bubbling</li>
          <li><code>once</code> - Removes the handler after the first time it runs</li>
          <li><code>self</code> - Only trigger handler if event.target is the element itself</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>Custom Events</h2>
    <p>Components can dispatch custom events that parent components can listen for.</p>
    
    <div class="demo-box">
      <h3>Dispatching and Handling Custom Events</h3>
      
      <button on:click={dispatchCustomEvent}>
        Dispatch Custom Event
      </button>
      
      <p class="note">
        This button dispatches a custom event that the component listens for.
      </p>
    </div>
  </section>

  <section class="example-section">
    <h2>Two-way Binding</h2>
    <p>Svelte makes it easy to bind form element values to variables.</p>
    
    <div class="demo-box">
      <h3>Form Element Bindings</h3>
      
      <div class="form-group">
        <label>
          Name:
          <input type="text" bind:value={name}>
        </label>
        <p>Hello, {name || 'stranger'}!</p>
      </div>
      
      <div class="form-group">
        <label>
          <input type="checkbox" bind:checked={agreed}>
          I agree to the terms
        </label>
        <p>You have {agreed ? 'agreed' : 'not agreed'} to the terms.</p>
      </div>
      
      <div class="form-group">
        <label>
          Select a color:
          <select bind:value={selectedColor}>
            {#each colors as color}
              <option value={color}>{color}</option>
            {/each}
          </select>
        </label>
        <p style="color: {selectedColor}">This text is {selectedColor}!</p>
      </div>
      
      <div class="form-group">
        <label>
          Select multiple colors:
          <select multiple bind:value={multipleColors}>
            {#each colors as color}
              <option value={color}>{color}</option>
            {/each}
          </select>
        </label>
        <p>Selected colors: {multipleColors.join(', ') || 'none'}</p>
      </div>
      
      <div class="form-group">
        <label>
          Your message:
          <textarea bind:value={textareaContent} rows="3"></textarea>
        </label>
        <p>Character count: {textareaContent.length}</p>
      </div>
      
      <div class="form-group">
        <label>
          Number:
          <input type="range" min="0" max="100" bind:value={number}>
        </label>
        <p>The number is: {number}</p>
      </div>
    </div>
  </section>

  <div class="next-steps">
    <h2>Next Steps</h2>
    <p>Now that you understand events and bindings, check out:</p>
    <ul>
      <li><a href="/learning/stores">Svelte Stores</a> - Learn about state management</li>
      <li><a href="/learning/advanced">Advanced Techniques</a> - Animations, transitions, and more</li>
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

  h3 {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    color: var(--text-secondary);
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
    margin: 0.5rem 0;
  }

  button:hover {
    background-color: var(--accent-color-dark);
  }

  .note {
    font-size: 0.9rem;
    color: var(--text-muted);
    font-style: italic;
    margin: 0.5rem 0 1.5rem 0;
  }

  .modifiers-list {
    background-color: var(--bg-secondary);
    padding: 1rem;
    border-radius: 4px;
    margin-top: 1rem;
  }

  .modifiers-list ul {
    padding-left: 1.5rem;
  }

  .modifiers-list li {
    margin: 0.5rem 0;
  }

  code {
    background-color: var(--bg-secondary);
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border-color);
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input[type="text"],
  select,
  textarea {
    display: block;
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.3rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 1rem;
    background-color: var(--bg-color);
    color: var(--text-color);
  }

  input[type="checkbox"] {
    margin-right: 0.5rem;
  }

  input[type="range"] {
    width: 100%;
    margin-top: 0.3rem;
  }

  select[multiple] {
    height: 8rem;
  }

  .next-steps {
    background-color: var(--bg-secondary);
    border-left: 4px solid var(--accent-color);
    padding: 1.5rem;
    border-radius: 0 8px 8px 0;
    margin-top: 2rem;
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