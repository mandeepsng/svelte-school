<script lang="ts">
  import { writable, readable, derived } from 'svelte/store';
  import { onMount } from 'svelte';
  
  // Creating a writable store
  const count = writable(0);
  
  // Creating a readable store (can only be set during creation)
  const time = readable(new Date(), function start(set) {
    const interval = setInterval(() => {
      set(new Date());
    }, 1000);
    
    return function stop() {
      clearInterval(interval);
    };
  });
  
  // Creating a derived store (depends on other stores)
  const timeString = derived(
    time,
    $time => $time.toLocaleTimeString()
  );
  
  // Store methods
  function increment() {
    count.update(n => n + 1);
  }
  
  function decrement() {
    count.update(n => n - 1);
  }
  
  function reset() {
    count.set(0);
  }
  
  // Custom store with additional methods
  function createTodoStore() {
    const { subscribe, set, update } = writable([
      { id: 1, text: 'Learn Svelte', done: true },
      { id: 2, text: 'Build a SaaS app', done: false },
      { id: 3, text: 'Connect to Laravel API', done: false }
    ]);
    
    return {
      subscribe,
      addTodo: (text: string) => update(todos => {
        const newTodo = {
          id: Math.max(0, ...todos.map(t => t.id)) + 1,
          text,
          done: false
        };
        return [...todos, newTodo];
      }),
      toggleTodo: (id: number) => update(todos => 
        todos.map(todo => 
          todo.id === id ? { ...todo, done: !todo.done } : todo
        )
      ),
      removeTodo: (id: number) => update(todos => 
        todos.filter(todo => todo.id !== id)
      ),
      clearCompleted: () => update(todos => 
        todos.filter(todo => !todo.done)
      )
    };
  }
  
  const todos = createTodoStore();
  
  // Form field for new todo
  let newTodo = '';
  
  function handleAddTodo() {
    if (newTodo.trim()) {
      todos.addTodo(newTodo);
      newTodo = '';
    }
  }
</script>

<svelte:head>
  <title>Svelte Stores | Learning Path</title>
</svelte:head>

<div class="container">
  <h1>Svelte Stores</h1>
  <p class="back-link"><a href="/">← Back to Home</a></p>

  <section class="example-section">
    <h2>What are Stores?</h2>
    <p>
      Stores are objects that contain values that can change over time. They're perfect for managing state that needs to be shared between components.
    </p>
  </section>

  <section class="example-section">
    <h2>1. Writable Stores</h2>
    <p>
      Writable stores can be updated from anywhere. They have <code>set</code> and <code>update</code> methods.
    </p>
    
    <div class="demo-box">
      <h3>Counter Example</h3>
      <p>Current count: <span class="highlight">{$count}</span></p>
      
      <div class="button-group">
        <button on:click={decrement}>-</button>
        <button on:click={increment}>+</button>
        <button on:click={reset}>Reset</button>
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>2. Readable Stores</h2>
    <p>
      Readable stores can only be set during creation. They're good for values that come from external sources.
    </p>
    
    <div class="demo-box">
      <h3>Current Time</h3>
      <p>Time: <span class="highlight">{$timeString}</span></p>
      <p class="note">This time automatically updates every second using a readable store.</p>
    </div>
  </section>

  <section class="example-section">
    <h2>3. Derived Stores</h2>
    <p>
      Derived stores depend on other stores and automatically update when their dependencies change.
    </p>
    
    <div class="demo-box">
      <h3>Time Formatting</h3>
      <p>The time string above is a derived store based on the time store.</p>
    </div>
  </section>

  <section class="example-section">
    <h2>4. Custom Stores</h2>
    <p>
      You can create custom stores with additional methods for specific functionality.
    </p>
    
    <div class="demo-box">
      <h3>Todo List</h3>
      
      <div class="todo-form">
        <input 
          bind:value={newTodo} 
          placeholder="Add a new todo item"
          on:keydown={e => e.key === 'Enter' && handleAddTodo()}
        >
        <button on:click={handleAddTodo}>Add</button>
      </div>
      
      <ul class="todo-list">
        {#each $todos as todo (todo.id)}
          <li class={todo.done ? 'done' : ''}>
            <label>
              <input 
                type="checkbox" 
                checked={todo.done} 
                on:change={() => todos.toggleTodo(todo.id)}
              >
              <span>{todo.text}</span>
            </label>
            <button class="delete-btn" on:click={() => todos.removeTodo(todo.id)}>×</button>
          </li>
        {/each}
      </ul>
      
      {#if $todos.some(todo => todo.done)}
        <button class="clear-btn" on:click={() => todos.clearCompleted()}>
          Clear completed
        </button>
      {/if}
    </div>
  </section>

  <div class="next-steps">
    <h2>Next Steps</h2>
    <p>Now that you understand Svelte stores, check out:</p>
    <ul>
      <li><a href="/learning/advanced">Advanced Techniques</a> - Learn about animations, transitions, and more</li>
      <li>Start building your SaaS application with Svelte and Laravel!</li>
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
    margin: 0.5rem 0.3rem;
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

  .button-group {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .todo-form {
    display: flex;
    margin-bottom: 1rem;
  }

  .todo-list {
    list-style-type: none;
    padding-left: 0;
  }

  .todo-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
  }

  .todo-list li.done span {
    text-decoration: line-through;
    color: #999;
  }

  .todo-list label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-grow: 1;
  }

  .delete-btn {
    background: none;
    color: #999;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0 0.5rem;
    margin: 0;
  }

  .delete-btn:hover {
    color: #ff3e00;
    background: none;
  }

  .clear-btn {
    background-color: #f0f0f0;
    color: #666;
    border: none;
    padding: 0.3rem 0.8rem;
    border-radius: 4px;
    font-size: 0.9rem;
    margin-top: 1rem;
  }

  .clear-btn:hover {
    background-color: #e0e0e0;
    color: #333;
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