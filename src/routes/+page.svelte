<script>
  import { onMount } from 'svelte';
  
  let title = "Svelte Learning Path";
  
  onMount(() => {
    console.log('Component mounted');
  });
</script>

<main>
  <h1>{title}</h1>
  <p>Welcome to this self-learning resource for Svelte. This project will help you learn Svelte step by step with practical examples.</p>
  
  <div class="card">
    <h2>Getting Started</h2>
    <p>Start your Svelte journey by exploring these core concepts:</p>
    <ul>
      <li><a href="/learning/basics">Svelte Basics</a> - Components, reactivity, and props</li>
      <li><a href="/learning/lifecycle">Component Lifecycle</a> - Understanding component lifecycle</li>
      <li><a href="/learning/events">Events and Bindings</a> - Handling user interactions</li>
      <li><a href="/learning/stores">Svelte Stores</a> - State management in Svelte</li>
      <li><a href="/learning/advanced">Advanced Techniques</a> - Animations, transitions, and more</li>
      <li><a href="/learning/routing">SvelteKit Routing and SSR</a> - File-based routing and server-side rendering</li>
      <li><a href="/learning/authentication">Authentication with Laravel</a> - Integrate Sanctum/Passport auth</li>
      <li><a href="/learning/api-integration">API Integration Techniques</a> - Connect to Laravel backend</li>
      <li><a href="/learning/forms">Form Handling and Validation</a> - Build and validate forms</li>
      <li><a href="/learning/realtime">Real-time Features with WebSockets</a> - Add real-time functionality</li>
    </ul>
  </div>
  
  <div class="info">
    <h3>About This Project</h3>
    <p>This project is designed to help you learn Svelte before building a SaaS tool that integrates with Laravel API.</p>
    <p>Built with SvelteKit - <a href="https://svelte.dev/docs/kit" target="_blank">Official Documentation</a></p>
  </div>
</main>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  h1 {
    color: #ff3e00;
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .card {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 2rem 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  h2 {
    color: #444;
    margin-top: 0;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin: 0.8rem 0;
    padding-left: 1.5rem;
    position: relative;
  }
  
  li:before {
    content: '→';
    position: absolute;
    left: 0;
    color: #ff3e00;
  }
  
  a {
    color: #0066cc;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
  }
  
  a:hover {
    border-color: currentColor;
  }
  
  .info {
    background-color: #ffefe9;
    border-left: 4px solid #ff3e00;
    padding: 1rem 1.5rem;
    margin-top: 2rem;
    border-radius: 0 8px 8px 0;
  }
  
  h3 {
    margin-top: 0;
    color: #333;
  }
</style>
