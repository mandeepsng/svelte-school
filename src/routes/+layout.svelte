<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { page } from '$app/stores';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import { theme } from '$lib/stores/theme';
  
  // Apply theme class to body
  $: if (typeof document !== 'undefined') {
    document.body.className = $theme === 'dark' ? 'dark-theme' : 'light-theme';
  }
  
  // Add Prism.js CSS
  onMount(() => {
    // Add Prism CSS
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Add font for code blocks
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
  });
</script>

<div class="app {$theme}-theme">
  <header>
    <div class="container header-content">
      <a href="/" class="logo">Svelte Learning</a>
      <nav>
        <ul>
          <li><a href="/" class:active={$page.url.pathname === '/'}>Home</a></li>
          <li><a href="/learning" class:active={$page.url.pathname.includes('/learning')}>Modules</a></li>
          <li><a href="/about" class:active={$page.url.pathname === '/about'}>About</a></li>
        </ul>
      </nav>
      <div class="theme-toggle-container">
        <ThemeToggle />
      </div>
    </div>
  </header>

  <main>
    <div class="container">
      {#key $page.url.pathname}
        <div in:fly={{ y: 20, duration: 300, delay: 300 }} out:fly={{ y: -20, duration: 300 }}>
          <slot />
        </div>
      {/key}
    </div>
  </main>

  <footer>
    <div class="container">
      <p>&copy; {new Date().getFullYear()} Svelte Learning</p>
    </div>
  </footer>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  header {
    background-color: var(--header-bg);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    color: var(--accent-color);
  }
  
  nav ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  nav li {
    margin-left: 1.5rem;
  }
  
  nav a {
    text-decoration: none;
    color: var(--text-color);
    font-weight: 500;
    padding: 0.5rem 0;
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease;
  }
  
  nav a:hover {
    color: var(--accent-color);
  }
  
  nav a.active {
    border-bottom-color: var(--accent-color);
    color: var(--accent-color);
  }
  
  main {
    flex-grow: 1;
    padding: 2rem 0;
  }
  
  footer {
    background-color: var(--footer-bg);
    padding: 1.5rem 0;
    color: var(--text-muted);
    font-size: 0.9rem;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  
  /* Mobile responsive design */
  @media (max-width: 768px) {
    .header-content {
      flex-direction: column;
      align-items: flex-start;
    }
    
    nav {
      width: 100%;
      margin: 1rem 0;
    }
    
    nav ul {
      width: 100%;
      justify-content: space-between;
    }
    
    nav li {
      margin-left: 0;
    }
    
    .theme-toggle-container {
      position: absolute;
      top: 1rem;
      right: 1.5rem;
    }
  }
</style> 