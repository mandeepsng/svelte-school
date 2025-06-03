<script lang="ts">
  import { onMount } from 'svelte';
  
  // Demo for dynamic params
  let userId = 123;
  let productId = 'svelte-book';
  
  // Demo for layout data
  let isLoggedIn = false;
  
  function toggleLogin() {
    isLoggedIn = !isLoggedIn;
  }
</script>

<svelte:head>
  <title>SvelteKit Routing | Learning Path</title>
</svelte:head>

<div class="container">
  <h1>SvelteKit Routing and SSR</h1>
  <p class="back-link"><a href="/">← Back to Home</a></p>
  
  <section class="example-section">
    <h2>File-based Routing</h2>
    <p>
      SvelteKit uses a file-based routing system where files in the <code>src/routes</code> directory automatically become routes in your application.
    </p>
    
    <div class="demo-box">
      <h3>Basic Route Structure</h3>
      <div class="code-example">
        <pre>
src/routes/
├── +page.svelte         # Home page (/)
├── about/
│   └── +page.svelte     # About page (/about)
├── blog/
│   ├── +page.svelte     # Blog index (/blog)
│   └── [slug]/          # Dynamic route
│       └── +page.svelte # Individual blog post (/blog/:slug)
        </pre>
      </div>
      <p>Each <code>+page.svelte</code> file represents a page component that will be rendered for that route.</p>
    </div>
  </section>

  <section class="example-section">
    <h2>Dynamic Routes</h2>
    <p>
      SvelteKit supports dynamic route parameters using square brackets in the folder name.
    </p>
    
    <div class="demo-box">
      <h3>Dynamic Route Examples</h3>
      <ul class="route-list">
        <li>
          <code>/users/[id]</code> matches <code>/users/123</code>, <code>/users/456</code>, etc.
        </li>
        <li>
          <code>/products/[category]/[id]</code> matches <code>/products/books/svelte-book</code>
        </li>
        <li>
          <code>/[...catchAll]</code> matches any route and captures the rest of the path
        </li>
      </ul>
      
      <h4>Route Parameter Access</h4>
      <p>
        Access route parameters in the <code>+page.svelte</code> component via the <code>$page.params</code> store:
      </p>
      <div class="code-example">
        {@html `<pre>
&lt;script&gt;
  import { page } from '$app/stores';
&lt;/script&gt;

&lt;h1&gt;User ID: {$page.params.id}&lt;/h1&gt;
        </pre>`}
      </div>
      
      <div class="demo-links">
        <p>Examples:</p>
        <a href="#" class="demo-link">/users/{userId}</a>
        <a href="#" class="demo-link">/products/{productId}</a>
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>Page Options</h2>
    <p>
      Control how pages are rendered using additional files:
    </p>
    
    <div class="demo-box">
      <h3>SvelteKit Special Files</h3>
      <ul class="feature-list">
        <li>
          <strong>+page.svelte</strong>: The page component
        </li>
        <li>
          <strong>+page.ts</strong>: Load data for the page
        </li>
        <li>
          <strong>+page.server.ts</strong>: Load data server-side only
        </li>
        <li>
          <strong>+layout.svelte</strong>: Layout component for the route and its children
        </li>
        <li>
          <strong>+layout.ts</strong>: Load data for the layout
        </li>
        <li>
          <strong>+error.svelte</strong>: Custom error page
        </li>
      </ul>
    </div>
  </section>

  <section class="example-section">
    <h2>Data Loading</h2>
    <p>
      SvelteKit provides a powerful data loading system through <code>load</code> functions.
    </p>
    
    <div class="demo-box">
      <h3>Load Function Examples</h3>
      
      <h4>Client and Server Data Loading</h4>
      <div class="code-example">
        {@html `<pre>
// +page.ts
export async function load({ params, fetch }) {
  const response = await fetch(\`/api/posts/\${params.slug}\`);
  const post = await response.json();
  
  return { post };
}
        </pre>`}
      </div>
      
      <h4>Server-Only Data Loading</h4>
      <div class="code-example">
        {@html `<pre>
// +page.server.ts
export async function load({ params, locals }) {
  // Access server-only resources like databases
  const post = await db.getPost(params.slug);
  
  // Access server-only data like session info
  const user = locals.user;
  
  return { post, user };
}
        </pre>`}
      </div>
      
      <p>In your <code>+page.svelte</code> component, you can access this data as props:</p>
      <div class="code-example">
        {@html `<pre>
&lt;script&gt;
  export let data; // Contains the data returned by load functions
&lt;/script&gt;

&lt;h1&gt;{data.post.title}&lt;/h1&gt;
&lt;p&gt;Written by {data.user.name}&lt;/p&gt;
        </pre>`}
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>Layouts</h2>
    <p>
      Layouts in SvelteKit allow you to share UI elements across multiple pages.
    </p>
    
    <div class="demo-box">
      <h3>Layout Hierarchy</h3>
      <div class="code-example">
        {@html `<pre>
src/routes/
├── +layout.svelte     # Root layout (applies to all routes)
├── +page.svelte       # Home page
├── dashboard/
│   ├── +layout.svelte # Dashboard layout (nested)
│   ├── +page.svelte   # Dashboard index
│   └── settings/
│       └── +page.svelte # Settings page (gets both layouts)
        </pre>`}
      </div>
      
      <h4>Layout Components</h4>
      <div class="code-example">
        {@html `<pre>
&lt;script&gt;
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';
  
  // You can access layout data
  export let data;
&lt;/script&gt;

&lt;Header user={data.user} /&gt;

&lt;main&gt;
  &lt;slot&gt;&lt;/slot&gt; &lt;!-- Page content goes here --&gt;
&lt;/main&gt;

&lt;Footer /&gt;
        </pre>`}
      </div>
      
      <div class="login-demo">
        <button on:click={toggleLogin}>
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </button>
        
        <div class="layout-example">
          <div class="layout-header">
            <span class="logo">MySaaS</span>
            {#if isLoggedIn}
              <span class="user">Welcome, User! | Logout</span>
            {:else}
              <span class="login-btn">Login</span>
            {/if}
          </div>
          
          <div class="layout-content">
            <div class="page-content">
              <h3>Page Content Here</h3>
              <p>This represents the <code>&lt;slot&gt;</code> where page content renders.</p>
            </div>
          </div>
          
          <div class="layout-footer">
            © 2023 MySaaS | Privacy Policy
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>Server-Side Rendering (SSR)</h2>
    <p>
      SvelteKit provides several rendering options to optimize for performance and SEO.
    </p>
    
    <div class="demo-box">
      <h3>Rendering Options</h3>
      <ul class="feature-list">
        <li>
          <strong>SSR (Server-Side Rendering)</strong>: Pages are rendered on the server for each request, providing the best SEO and initial load experience.
        </li>
        <li>
          <strong>CSR (Client-Side Rendering)</strong>: Pages are rendered in the browser, useful for private pages that don't need SEO.
        </li>
        <li>
          <strong>SSG (Static Site Generation)</strong>: Pages are pre-rendered at build time, providing the fastest possible loading experience.
        </li>
        <li>
          <strong>Hybrid Rendering</strong>: Mix and match approaches for different routes.
        </li>
      </ul>
      
      <h4>Configure Rendering in +page.ts</h4>
      <div class="code-example">
        {@html `<pre>
// SSR (default)
export const ssr = true;

// CSR (disable SSR)
export const ssr = false;

// SSG (prerender at build time)
export const prerender = true;

// For dynamic routes that should be prerendered
export const entries = () => [
  { slug: 'hello-world' },
  { slug: 'getting-started' }
];
        </pre>`}
      </div>
    </div>
  </section>

  <div class="next-steps">
    <h2>Next Steps</h2>
    <p>Now that you understand SvelteKit routing and server-side rendering, check out:</p>
    <ul>
      <li><a href="/learning/authentication">Authentication with Laravel Sanctum/Passport</a> - Implement authentication for your SaaS app</li>
      <li><a href="/learning/api-integration">API Integration Techniques</a> - Connect your Svelte frontend to Laravel backend</li>
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

  h4 {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    color: var(--text-muted);
  }

  .demo-box {
    background-color: var(--card-bg);
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1rem 0;
    box-shadow: 0 2px 8px var(--shadow-color);
  }

  .code-example {
    background-color: var(--code-bg);
    color: #f8f8f2;
    border-radius: 4px;
    padding: 1rem;
    margin: 1rem 0;
    overflow-x: auto;
  }

  pre {
    margin: 0;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    white-space: pre;
  }

  code {
    background-color: var(--bg-secondary);
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
  }

  .route-list, .feature-list {
    padding-left: 1.5rem;
  }

  .route-list li, .feature-list li {
    margin: 0.5rem 0;
  }

  .demo-links {
    margin-top: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
  }

  .demo-link {
    display: inline-block;
    background-color: var(--bg-secondary);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    color: var(--accent-color);
    text-decoration: none;
  }

  .demo-link:hover {
    background-color: var(--hover-bg);
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

  .layout-example {
    margin-top: 1.5rem;
    border: 2px dashed var(--border-color);
    border-radius: 8px;
    overflow: hidden;
  }

  .layout-header {
    background-color: var(--header-bg);
    color: var(--text-color);
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-weight: bold;
    font-size: 1.2rem;
  }

  .user, .login-btn {
    font-size: 0.9rem;
  }

  .login-btn {
    cursor: pointer;
    padding: 0.3rem 0.8rem;
    background-color: var(--accent-color);
    border-radius: 4px;
    color: white;
  }

  .layout-content {
    min-height: 200px;
    padding: 0;
    background-color: var(--bg-color);
  }

  .page-content {
    padding: 1.5rem;
    margin: 1rem;
    background-color: var(--card-bg);
    border-radius: 4px;
    box-shadow: 0 1px 3px var(--shadow-color);
  }

  .layout-footer {
    background-color: var(--footer-bg);
    padding: 1rem;
    text-align: center;
    font-size: 0.9rem;
    color: var(--text-muted);
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