<script lang="ts">
  import { fly, fade, slide, scale } from 'svelte/transition';
  import { elasticOut, bounceOut } from 'svelte/easing';
  import { flip } from 'svelte/animate';
  import { onMount } from 'svelte';
  
  // Sample data for animations and transitions
  let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];
  
  // Toggle for visibility
  let visible = true;
  let showBox = true;
  
  // For flip animation
  let showItems = true;
  
  // For action example
  let tooltipText = 'This is a tooltip created using Svelte actions';
  
  // Action for tooltip
  function tooltip(node: HTMLElement, text: string) {
    const tooltip = document.createElement('div');
    tooltip.textContent = text;
    
    Object.assign(tooltip.style, {
      position: 'absolute',
      background: 'rgba(0,0,0,0.7)',
      color: 'white',
      padding: '0.5em 1em',
      fontSize: '0.8em',
      borderRadius: '2px',
      pointerEvents: 'none',
      opacity: '0',
      transition: 'opacity 0.2s',
      top: '0',
      left: '0',
      zIndex: '100'
    });
    
    function position() {
      const { top, left, width } = node.getBoundingClientRect();
      tooltip.style.top = `${top - 30}px`;
      tooltip.style.left = `${left + width/2 - tooltip.offsetWidth/2}px`;
    }
    
    function show() {
      document.body.appendChild(tooltip);
      tooltip.style.opacity = '1';
      position();
    }
    
    function hide() {
      tooltip.style.opacity = '0';
      setTimeout(() => {
        if (tooltip.parentNode) document.body.removeChild(tooltip);
      }, 200);
    }
    
    node.addEventListener('mouseenter', show);
    node.addEventListener('mouseleave', hide);
    window.addEventListener('scroll', position);
    
    return {
      update(newText: string) {
        tooltip.textContent = newText;
      },
      destroy() {
        node.removeEventListener('mouseenter', show);
        node.removeEventListener('mouseleave', hide);
        window.removeEventListener('scroll', position);
        if (tooltip.parentNode) document.body.removeChild(tooltip);
      }
    };
  }
  
  // Functions for the todo list example
  let todos: string[] = ['Learn Svelte basics', 'Practice transitions', 'Build a real app'];
  let newTodo = '';
  
  function addTodo() {
    if (newTodo.trim()) {
      todos = [...todos, newTodo];
      newTodo = '';
    }
  }
  
  function removeTodo(index: number) {
    todos = todos.filter((_, i) => i !== index);
  }
</script>

<svelte:head>
  <title>Advanced Techniques | Svelte Learning Path</title>
</svelte:head>

<div class="container">
  <h1>Advanced Techniques</h1>
  <p class="back-link"><a href="/">← Back to Home</a></p>

  <section class="example-section">
    <h2>Transitions</h2>
    <p>
      Svelte provides built-in transition functions that make it easy to animate elements as they are added to and removed from the DOM.
    </p>
    
    <div class="demo-box">
      <h3>Basic Transitions</h3>
      
      <button on:click={() => visible = !visible}>
        {visible ? 'Hide' : 'Show'} Content
      </button>
      
      {#if visible}
        <div class="transition-demo" transition:fade={{ duration: 300 }}>
          <p>This content fades in and out</p>
        </div>
      {/if}
      
      <h3>Fly Transition</h3>
      <button on:click={() => showBox = !showBox}>
        Toggle Box
      </button>
      
      {#if showBox}
        <div 
          class="box" 
          in:fly={{ y: 200, duration: 500 }} 
          out:fly={{ y: -200, duration: 500 }}
        >
          Flying Box
        </div>
      {/if}
    </div>
  </section>

  <section class="example-section">
    <h2>Animations</h2>
    <p>
      Animations in Svelte allow you to smoothly transition between different states.
    </p>
    
    <div class="demo-box">
      <h3>List with Flip Animation</h3>
      
      <button on:click={() => showItems = !showItems}>
        {showItems ? 'Hide' : 'Show'} Items
      </button>
      
      {#if showItems}
        <button on:click={() => items = items.reverse()}>
          Reverse Order
        </button>
        
        <ul class="flip-list">
          {#each items as item (item.id)}
            <li animate:flip={{ duration: 300 }}>
              {item.name}
            </li>
          {/each}
        </ul>
      {/if}
    </div>
    
    <div class="demo-box">
      <h3>Todo List with Transitions</h3>
      
      <div class="todo-input">
        <input 
          bind:value={newTodo} 
          placeholder="Add a new todo"
          on:keydown={e => e.key === 'Enter' && addTodo()}
        >
        <button on:click={addTodo}>Add</button>
      </div>
      
      <ul class="todo-list">
        {#each todos as todo, i (todo)}
          <li 
            animate:flip={{ duration: 300 }}
            in:slide={{ duration: 300 }}
            out:scale={{ duration: 300, easing: bounceOut }}
          >
            <span>{todo}</span>
            <button class="remove-btn" on:click={() => removeTodo(i)}>×</button>
          </li>
        {/each}
      </ul>
    </div>
  </section>

  <section class="example-section">
    <h2>Actions</h2>
    <p>
      Actions are a way to add custom behavior to elements, similar to directives in other frameworks.
    </p>
    
    <div class="demo-box">
      <h3>Tooltip Action</h3>
      
      <button use:tooltip={tooltipText}>
        Hover me for tooltip
      </button>
      
      <p class="note">
        The tooltip is implemented as a Svelte action that adds custom behavior to the button element.
      </p>
    </div>
  </section>

  <div class="next-steps">
    <h2>Ready for SaaS Development</h2>
    <p>Congratulations! You've completed the Svelte learning path. You're now ready to:</p>
    <ul>
      <li>Build your own SaaS application using Svelte</li>
      <li>Integrate with Laravel API on the backend</li>
      <li>Explore the <a href="https://svelte.dev/docs" target="_blank">official Svelte documentation</a> for more advanced topics</li>
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

  h3 {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    color: #555;
  }

  .demo-box {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1rem 0 2rem 0;
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
    margin: 0.5rem 0.3rem 0.5rem 0;
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
    width: 250px;
  }

  .note {
    font-size: 0.9rem;
    color: #666;
    font-style: italic;
    margin: 0.5rem 0;
  }

  code {
    background-color: #f0f0f0;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
  }

  .transition-demo {
    background-color: #ffe9e3;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 4px;
    border-left: 3px solid #ff3e00;
  }

  .box {
    background-color: #ff3e00;
    color: white;
    width: 100px;
    height: 100px;
    margin: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-weight: bold;
  }

  .flip-list {
    list-style-type: none;
    padding: 0;
    margin: 1rem 0;
  }

  .flip-list li {
    background-color: #f0f0f0;
    margin: 0.5rem 0;
    padding: 0.8rem 1rem;
    border-radius: 4px;
  }

  .todo-input {
    display: flex;
    margin: 1rem 0;
  }

  .todo-list {
    list-style-type: none;
    padding: 0;
  }

  .todo-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 1rem;
    margin: 0.5rem 0;
    background-color: #f0f0f0;
    border-radius: 4px;
  }

  .remove-btn {
    background: none;
    color: #999;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0 0.3rem;
    margin: 0;
    line-height: 1;
  }

  .remove-btn:hover {
    color: #ff3e00;
    background: none;
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