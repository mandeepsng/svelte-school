<script lang="ts">
  import { fly, fade, slide, scale, draw } from 'svelte/transition';
  import { elasticOut, quintOut } from 'svelte/easing';
  
  // Flip animation example
  let items = ['Learn Svelte Transitions', 'Master Animations', 'Apply Effects', 'Build Interactive UIs'];
  
  function addItem() {
    const newItem = 'New Animation Task ' + (items.length + 1);
    items = [...items, newItem];
  }
  
  function removeItem(index: number) {
    items = items.filter((_, i) => i !== index);
  }
  
  // Toggle animation demo
  let visible = true;
  
  // Staggered animation demo
  let staggeredVisible = false;
  let boxes = [1, 2, 3, 4, 5];
  
  // Custom animation parameters
  let duration = 800;
  let x = 100;
  
  // SVG animation demo
  let showSvg = false;
</script>

<svelte:head>
  <title>Svelte Animations | Learning Path</title>
</svelte:head>

<div class="container">
  <h1>Advanced Svelte Animations</h1>
  <p class="back-link"><a href="/learning">← Back to Learning Modules</a></p>

  <section class="example-section">
    <h2>1. Basic Transitions</h2>
    <p>Svelte provides built-in transition functions like <code>fade</code>, <code>fly</code>, and <code>slide</code>.</p>
    
    <div class="demo-box">
      <h3>Toggle Visibility</h3>
      <button on:click={() => visible = !visible}>
        {visible ? 'Hide' : 'Show'} Element
      </button>
      
      <div class="animation-container">
        {#if visible}
          <div class="animation-box" transition:fade={{ duration: 400 }}>
            <p>This element fades in and out</p>
          </div>
        {/if}
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>2. Directional Animations</h2>
    <p>You can create directional animations using the <code>fly</code> transition.</p>
    
    <div class="demo-box">
      <h3>Parameters</h3>
      <div class="controls">
        <label>
          Duration: {duration}ms
          <input type="range" bind:value={duration} min="200" max="2000" step="100">
        </label>
        <label>
          X offset: {x}px
          <input type="range" bind:value={x} min="-200" max="200" step="10">
        </label>
      </div>
      
      <button on:click={() => visible = !visible}>
        Toggle Fly Animation
      </button>
      
      <div class="animation-container">
        {#if visible}
          <div class="animation-box" 
               in:fly={{ x, y: 0, duration, opacity: 0 }}
               out:fly={{ x: -x, y: 0, duration, opacity: 0 }}>
            <p>This element flies in and out</p>
          </div>
        {/if}
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>3. List Animations with keyed each blocks</h2>
    <p>Animate items in a list using transitions and keyed each blocks.</p>
    
    <div class="demo-box">
      <h3>Animated Task List</h3>
      <button on:click={addItem}>Add Item</button>
      
      <ul class="animated-list">
        {#each items as item, i (item)}
          <li in:slide={{ duration: 300, delay: i * 50 }}
              out:slide={{ duration: 300 }}>
            {item}
            <button class="remove-btn" on:click={() => removeItem(i)}>×</button>
          </li>
        {/each}
      </ul>
    </div>
  </section>

  <section class="example-section">
    <h2>4. Staggered Animations</h2>
    <p>Create staggered animations by adding a delay based on the item index.</p>
    
    <div class="demo-box">
      <h3>Staggered Grid</h3>
      <button on:click={() => staggeredVisible = !staggeredVisible}>
        {staggeredVisible ? 'Hide' : 'Show'} Grid
      </button>
      
      <div class="grid-container">
        {#if staggeredVisible}
          {#each boxes as box, i}
            <div class="grid-box"
                 in:scale={{ 
                   delay: i * 100, 
                   duration: 400, 
                   start: 0.5,
                   opacity: 0,
                   easing: elasticOut 
                 }}>
              {box}
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>5. SVG Animations</h2>
    <p>Svelte can animate SVG elements with the <code>draw</code> transition.</p>
    
    <div class="demo-box">
      <h3>SVG Path Animation</h3>
      <button on:click={() => showSvg = !showSvg}>
        {showSvg ? 'Hide' : 'Draw'} SVG
      </button>
      
      <div class="svg-container">
        <svg viewBox="0 0 100 100" width="200" height="200">
          {#if showSvg}
            <path 
              transition:draw={{ duration: 1000, delay: 100, easing: quintOut }}
              d="M10,90 C30,90 30,50 50,50 C70,50 70,90 90,90"
              fill="none"
              stroke="#ff3e00"
              stroke-width="2"
            />
            <circle
              in:scale={{ duration: 1000, start: 0, delay: 800 }}
              cx="50" cy="50" r="10" fill="#ff3e00" 
            />
          {/if}
        </svg>
      </div>
    </div>
  </section>

  <div class="next-steps">
    <h2>Next Steps</h2>
    <p>To further enhance your Svelte animation skills:</p>
    <ul>
      <li>Try combining multiple transitions on the same element</li>
      <li>Explore creating custom transitions with the <code>tick</code> function</li>
      <li>Check out <a href="https://svelte.dev/tutorial/animate" target="_blank">Svelte's official animation documentation</a></li>
      <li><a href="/learning/advanced">Explore Advanced Svelte Techniques</a></li>
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
    border-bottom: 2px solid var(--border-color);
    padding-bottom: 0.5rem;
    margin-top: 2rem;
  }

  .demo-box {
    background-color: var(--card-bg);
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1rem 0;
    box-shadow: 0 2px 8px var(--shadow-color);
  }

  code {
    background-color: var(--bg-secondary);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
  }

  button {
    background-color: var(--accent-color);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.95rem;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
  }

  button:hover {
    background-color: var(--accent-color-dark);
  }

  .animation-container {
    margin-top: 1rem;
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .animation-box {
    background-color: var(--accent-color-light);
    color: var(--text-color);
    padding: 1rem;
    border-radius: 6px;
    text-align: center;
    width: 100%;
  }

  .controls {
    margin: 1rem 0;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .controls label {
    display: block;
    margin-bottom: 0.5rem;
  }

  .controls input {
    width: 100%;
    margin-top: 0.5rem;
  }

  .animated-list {
    list-style-type: none;
    padding-left: 0;
    margin-top: 1rem;
  }

  .animated-list li {
    background-color: var(--bg-secondary);
    margin-bottom: 0.5rem;
    padding: 0.8rem 1rem;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .remove-btn {
    background-color: transparent;
    color: var(--text-muted);
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  .remove-btn:hover {
    background-color: rgba(239, 68, 68, 0.1);
    color: var(--error-color);
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    margin-top: 1rem;
    min-height: 50px;
  }

  .grid-box {
    background-color: var(--accent-color);
    color: white;
    border-radius: 4px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }

  .svg-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    min-height: 200px;
  }

  .next-steps {
    background-color: var(--bg-secondary);
    border-left: 4px solid var(--accent-color);
    padding: 1.5rem;
    border-radius: 0 8px 8px 0;
    margin-top: 3rem;
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

  @media (max-width: 600px) {
    .grid-container {
      grid-template-columns: repeat(3, 1fr);
    }
    
    .controls {
      flex-direction: column;
    }
  }
</style> 