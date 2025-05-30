<script lang="ts">
  import { onMount } from 'svelte';
  
  // Sample data for demonstration
  let posts: Array<{id: number, title: string, body: string}> = [];
  let loading = false;
  let error: string | null = null;
  
  // Mock API response
  const mockPosts = [
    { id: 1, title: 'Getting Started with Svelte', body: 'Svelte is a radical new approach to building user interfaces...' },
    { id: 2, title: 'Connecting to Laravel API', body: 'Laravel provides a robust API framework that works well with Svelte...' },
    { id: 3, title: 'Building a SaaS Product', body: 'When building a SaaS product, you need to consider many factors...' }
  ];
  
  // Simulating an API call
  async function fetchPosts() {
    loading = true;
    error = null;
    
    try {
      // In a real app, this would be a fetch or axios call
      // const response = await fetch('https://api.example.com/posts');
      // const data = await response.json();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use mock data
      posts = mockPosts;
    } catch (err) {
      error = 'Failed to fetch posts';
      console.error(err);
    } finally {
      loading = false;
    }
  }
  
  // Load data when component mounts
  onMount(() => {
    fetchPosts();
  });
</script>

<svelte:head>
  <title>API Integration | Learning Path</title>
</svelte:head>

<div class="container">
  <h1>API Integration Techniques</h1>
  <p class="back-link"><a href="/">← Back to Home</a></p>
  
  <section class="example-section">
    <h2>Connecting Svelte to Laravel API</h2>
    <p>
      Integrating your Svelte frontend with a Laravel backend API is a common pattern for building modern web applications.
      This guide covers the best practices for API integration.
    </p>
    
    <div class="demo-box">
      <h3>Setting Up Axios</h3>
      <p>
        <a href="https://axios-http.com/" target="_blank">Axios</a> is a popular HTTP client that simplifies API requests.
      </p>
      
      <div class="code-example">
        {@html `<pre>
// Install axios
npm install axios

// Create src/lib/api.js
import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true // For cookie-based auth
});

// Request interceptor - add auth token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

// Response interceptor - handle common errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized (redirect to login, etc.)
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;</pre>`}
      </div>
    </div>
  </section>
  
  <section class="example-section">
    <h2>API Request Methods</h2>
    
    <div class="demo-box">
      <h3>Creating API Service Modules</h3>
      <p>
        It's a good practice to organize API calls into service modules by feature or entity.
      </p>
      
      <div class="code-example">
        {@html `<pre>
// src/lib/services/posts.js
import api from '../api';

export const PostsService = {
  // Get all posts
  getAll: () => api.get('/posts'),
  
  // Get a single post by ID
  getById: (id) => api.get(\`/posts/\${id}\`),
  
  // Create a new post
  create: (data) => api.post('/posts', data),
  
  // Update a post
  update: (id, data) => api.put(\`/posts/\${id}\`, data),
  
  // Delete a post
  delete: (id) => api.delete(\`/posts/\${id}\`)
};</pre>`}
      </div>
    </div>
    
    <div class="demo-box">
      <h3>Using API Services in Components</h3>
      <div class="code-example">
        {@html `<pre>
&lt;script&gt;
  import { onMount } from 'svelte';
  import { PostsService } from '$lib/services/posts';
  
  let posts = [];
  let loading = true;
  let error = null;
  
  async function loadPosts() {
    try {
      loading = true;
      const response = await PostsService.getAll();
      posts = response.data;
    } catch (err) {
      error = err.response?.data?.message || 'Failed to load posts';
    } finally {
      loading = false;
    }
  }
  
  onMount(loadPosts);
&lt;/script&gt;

{#if loading}
  &lt;p&gt;Loading...&lt;/p&gt;
{:else if error}
  &lt;p class="error"&gt;{error}&lt;/p&gt;
{:else}
  &lt;ul&gt;
    {#each posts as post}
      &lt;li&gt;{post.title}&lt;/li&gt;
    {/each}
  &lt;/ul&gt;
{/if}</pre>`}
      </div>
    </div>
  </section>
  
  <section class="example-section">
    <h2>Using SvelteKit's Data Loading</h2>
    
    <div class="demo-box">
      <h3>Load Function for API Data</h3>
      <p>
        SvelteKit provides a powerful data loading system with the <code>load</code> function.
      </p>
      
      <div class="code-example">
        {@html `<pre>
// src/routes/posts/+page.js
import { PostsService } from '$lib/services/posts';

export async function load({ fetch }) {
  try {
    // Use the fetch instance provided by SvelteKit
    const response = await PostsService.getAll();
    return {
      posts: response.data
    };
  } catch (error) {
    return {
      posts: [],
      error: error.response?.data?.message || 'Failed to load posts'
    };
  }
}</pre>`}
      </div>
      
      <div class="code-example">
        {@html `<pre>
// src/routes/posts/+page.svelte
&lt;script&gt;
  // Access the loaded data
  export let data;
  
  // Destructure the data
  const { posts, error } = data;
&lt;/script&gt;

{#if error}
  &lt;p class="error"&gt;{error}&lt;/p&gt;
{:else}
  &lt;ul&gt;
    {#each posts as post}
      &lt;li&gt;{post.title}&lt;/li&gt;
    {/each}
  &lt;/ul&gt;
{/if}</pre>`}
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>API Data Management with Svelte Stores</h2>
    
    <div class="demo-box">
      <h3>Creating Reactive Stores for API Data</h3>
      <p>
        Using Svelte stores to manage API data provides a reactive and centralized approach.
      </p>
      
      <div class="code-example">
        {@html `<pre>
// src/stores/posts.js
import { writable } from 'svelte/store';
import { PostsService } from '$lib/services/posts';

// Create initial state
const initialState = {
  posts: [],
  loading: false,
  error: null
};

// Create and export the store
function createPostsStore() {
  const { subscribe, set, update } = writable(initialState);
  
  return {
    subscribe,
    
    // Load all posts
    fetchPosts: async () => {
      update(state => ({ ...state, loading: true, error: null }));
      
      try {
        const response = await PostsService.getAll();
        update(state => ({ 
          ...state, 
          posts: response.data,
          loading: false
        }));
      } catch (error) {
        update(state => ({ 
          ...state, 
          error: error.response?.data?.message || 'Failed to load posts',
          loading: false
        }));
      }
    },
    
    // Add a new post
    addPost: async (postData) => {
      update(state => ({ ...state, loading: true, error: null }));
      
      try {
        const response = await PostsService.create(postData);
        update(state => ({ 
          ...state, 
          posts: [...state.posts, response.data],
          loading: false
        }));
        return response.data;
      } catch (error) {
        update(state => ({ 
          ...state, 
          error: error.response?.data?.message || 'Failed to create post',
          loading: false
        }));
        throw error;
      }
    },
    
    // Update an existing post
    updatePost: async (id, postData) => {
      update(state => ({ ...state, loading: true, error: null }));
      
      try {
        const response = await PostsService.update(id, postData);
        update(state => ({ 
          ...state, 
          posts: state.posts.map(post => 
            post.id === id ? response.data : post
          ),
          loading: false
        }));
        return response.data;
      } catch (error) {
        update(state => ({ 
          ...state, 
          error: error.response?.data?.message || 'Failed to update post',
          loading: false
        }));
        throw error;
      }
    },
    
    // Delete a post
    deletePost: async (id) => {
      update(state => ({ ...state, loading: true, error: null }));
      
      try {
        await PostsService.delete(id);
        update(state => ({ 
          ...state, 
          posts: state.posts.filter(post => post.id !== id),
          loading: false
        }));
      } catch (error) {
        update(state => ({ 
          ...state, 
          error: error.response?.data?.message || 'Failed to delete post',
          loading: false
        }));
        throw error;
      }
    },
    
    // Reset store to initial state
    reset: () => set(initialState)
  };
}

export const postsStore = createPostsStore();</pre>`}
      </div>
      
      <h4>Using the Store in Components</h4>
      <div class="code-example">
        {@html `<pre>
&lt;script&gt;
  import { onMount } from 'svelte';
  import { postsStore } from '../stores/posts';
  
  onMount(() => {
    // Load posts when component mounts
    postsStore.fetchPosts();
  });
  
  // Create a new post
  async function handleCreatePost(formData) {
    try {
      await postsStore.addPost({
        title: formData.title,
        body: formData.body
      });
      // Handle success (e.g., show notification)
    } catch (error) {
      // Handle error
    }
  }
&lt;/script&gt;

{#if $postsStore.loading}
  &lt;p&gt;Loading...&lt;/p&gt;
{:else if $postsStore.error}
  &lt;p class="error"&gt;{$postsStore.error}&lt;/p&gt;
{:else}
  &lt;ul&gt;
    {#each $postsStore.posts as post}
      &lt;li&gt;
        {post.title}
        &lt;button on:click={() => postsStore.deletePost(post.id)}&gt;Delete&lt;/button&gt;
      &lt;/li&gt;
    {/each}
  &lt;/ul&gt;
{/if}</pre>`}
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>Error Handling Strategies</h2>
    
    <div class="demo-box">
      <h3>Handling API Errors</h3>
      <p>
        Properly handling API errors improves user experience and helps with debugging.
      </p>
      
      <ul class="feature-list">
        <li>
          <strong>Global Error Handling</strong> - Handle common errors like 401, 403, 500 in Axios interceptors
        </li>
        <li>
          <strong>Component-Level Error Handling</strong> - Use try/catch blocks for specific operations
        </li>
        <li>
          <strong>Error UI Components</strong> - Create reusable error message components
        </li>
        <li>
          <strong>Form Validation Errors</strong> - Handle Laravel validation errors (422 responses)
        </li>
      </ul>
      
      <div class="code-example">
        {@html `<pre>
// Handling Laravel validation errors
async function submitForm(formData) {
  try {
    const response = await api.post('/endpoint', formData);
    // Handle success
  } catch (error) {
    if (error.response?.status === 422) {
      // Laravel validation errors
      const validationErrors = error.response.data.errors;
      // Map errors to form fields
      Object.keys(validationErrors).forEach(field => {
        formErrors[field] = validationErrors[field][0];
      });
    } else {
      // Other errors
      errorMessage = error.response?.data?.message || 'An error occurred';
    }
  }
}</pre>`}
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>Demo: API Integration Example</h2>
    
    <div class="demo-box">
      <h3>Posts from API</h3>
      
      <button on:click={fetchPosts} class="refresh-btn">
        Refresh Posts
      </button>
      
      <div class="posts-container">
        {#if loading}
          <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading posts...</p>
          </div>
        {:else if error}
          <div class="error-message">
            <p>{error}</p>
            <button on:click={fetchPosts}>Try Again</button>
          </div>
        {:else if posts.length === 0}
          <p>No posts found.</p>
        {:else}
          <div class="posts-list">
            {#each posts as post}
              <div class="post-card">
                <h4>{post.title}</h4>
                <p>{post.body}</p>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>Best Practices</h2>
    
    <div class="demo-box">
      <h3>API Integration Tips</h3>
      <ul class="feature-list">
        <li>
          <strong>Use Environment Variables</strong> - Store API URLs in <code>.env</code> files
        </li>
        <li>
          <strong>Centralize API Logic</strong> - Create service modules by feature
        </li>
        <li>
          <strong>Handle Loading States</strong> - Always show loading indicators during requests
        </li>
        <li>
          <strong>Error Handling</strong> - Implement proper error handling at multiple levels
        </li>
        <li>
          <strong>Type Definitions</strong> - Use TypeScript interfaces for API responses
        </li>
        <li>
          <strong>Caching</strong> - Consider caching strategies for frequently accessed data
        </li>
        <li>
          <strong>Request Cancellation</strong> - Use AbortController to cancel pending requests
        </li>
        <li>
          <strong>Offline Support</strong> - Consider implementing offline capabilities
        </li>
      </ul>
    </div>
  </section>

  <div class="next-steps">
    <h2>Next Steps</h2>
    <p>Now that you understand API integration techniques, check out:</p>
    <ul>
      <li><a href="/learning/forms">Form Handling and Validation</a> - Create and validate forms in Svelte</li>
      <li><a href="/learning/realtime">Real-time Features with WebSockets</a> - Add real-time functionality to your SaaS app</li>
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

  h4 {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    color: #666;
  }

  .demo-box {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1rem 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .code-example {
    background-color: #2d2d2d;
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
    background-color: #f0f0f0;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
  }

  .feature-list {
    padding-left: 1.5rem;
  }

  .feature-list li {
    margin: 0.8rem 0;
  }

  button {
    background-color: #ff3e00;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    margin: 0.5rem 0;
  }

  button:hover {
    background-color: #e03600;
  }

  .refresh-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .posts-container {
    margin-top: 1.5rem;
    min-height: 200px;
  }

  .loading-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255, 62, 0, 0.1);
    border-left-color: #ff3e00;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .error-message {
    background-color: #ffebe9;
    color: #e03600;
    padding: 1rem;
    border-radius: 4px;
    margin: 1rem 0;
  }

  .posts-list {
    display: grid;
    gap: 1rem;
  }

  .post-card {
    background-color: white;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 1rem;
  }

  .post-card h4 {
    margin-top: 0;
    color: #333;
  }

  .post-card p {
    margin-bottom: 0;
    color: #666;
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