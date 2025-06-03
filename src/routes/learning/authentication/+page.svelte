<script lang="ts">
  import { onMount } from 'svelte';
  
  // For demo purposes
  let isAuthenticated = false;
  let email = '';
  let password = '';
  let token = '';
  let errorMessage = '';
  
  function login() {
    // This is a mock login - in a real app you would call your Laravel API
    if (email === 'user@example.com' && password === 'password') {
      isAuthenticated = true;
      token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...'; // Mock token
      errorMessage = '';
    } else {
      errorMessage = 'Invalid credentials';
    }
  }
  
  function logout() {
    isAuthenticated = false;
    token = '';
    errorMessage = '';
  }
</script>

<svelte:head>
  <title>Authentication with Laravel | Learning Path</title>
</svelte:head>

<div class="container">
  <h1>Authentication with Laravel</h1>
  <p class="back-link"><a href="/">← Back to Home</a></p>
  
  <section class="example-section">
    <h2>Laravel Authentication Options</h2>
    <p>
      When building a SaaS application with Svelte frontend and Laravel backend, you have several authentication options:
    </p>
    
    <div class="demo-box">
      <h3>Popular Laravel Authentication Methods</h3>
      <ul class="feature-list">
        <li>
          <strong>Laravel Sanctum</strong> - Lightweight authentication system for SPAs, mobile apps, and token-based APIs
        </li>
        <li>
          <strong>Laravel Passport</strong> - Full OAuth2 server implementation with more advanced features
        </li>
        <li>
          <strong>Laravel Fortify</strong> - Backend authentication implementation without UI components
        </li>
      </ul>
      
      <p class="note">For most Svelte + Laravel SaaS applications, <strong>Laravel Sanctum</strong> is the recommended choice due to its simplicity and good SPA support.</p>
    </div>
  </section>

  <section class="example-section">
    <h2>Setting Up Laravel Sanctum</h2>
    
    <div class="demo-box">
      <h3>Backend Setup (Laravel)</h3>
      
      <h4>1. Install Sanctum</h4>
      <div class="code-example">
        <pre>composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate</pre>
      </div>
      
      <h4>2. Configure Sanctum in Kernel.php</h4>
      <div class="code-example">
        <pre>// app/Http/Kernel.php
'api' => [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],</pre>
      </div>
      
      <h4>3. Set Up CORS (for SPA usage)</h4>
      <div class="code-example">
        <pre>// config/cors.php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['http://localhost:5173'], // Your Svelte app URL
'allowed_origins_patterns' => [],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => true, // Important for cookies</pre>
      </div>
      
      <h4>4. Create Login API Endpoint</h4>
      <div class="code-example">
        {@html `<pre>
// routes/api.php
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');</pre>`}
      </div>
      
      <div class="code-example">
        {@html `<pre>
// AuthController.php
public function login(Request $request)
{
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (!Auth::attempt($credentials)) {
        return response()->json([
            'message' => 'Invalid login credentials'
        ], 401);
    }

    $user = Auth::user();
    $token = $user->createToken('auth-token')->plainTextToken;

    return response()->json([
        'user' => $user,
        'token' => $token,
    ]);
}</pre>`}
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>Connecting Svelte to Laravel Sanctum</h2>
    
    <div class="demo-box">
      <h3>Frontend Authentication (Svelte)</h3>
      
      <h4>Two Authentication Approaches:</h4>
      
      <div class="auth-approaches">
        <div class="approach">
          <h5>1. Cookie-based Authentication</h5>
          <p>Uses HttpOnly cookies - better for SPA security.</p>
          <div class="code-example">
            {@html `<pre>
// Sanctum cookie setup in Svelte
import axios from 'axios';

// Configure axios
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true; // Important for cookies

async function login(email, password) {
  // Get CSRF cookie first
  await axios.get('/sanctum/csrf-cookie');
  
  // Then login
  const response = await axios.post('/api/login', { 
    email, 
    password 
  });
  
  return response.data;
}</pre>`}
          </div>
        </div>
        
        <div class="approach">
          <h5>2. Token-based Authentication</h5>
          <p>Uses Bearer tokens in Authorization header.</p>
          <div class="code-example">
            {@html `<pre>
// Token storage and usage in Svelte
import axios from 'axios';

// Configure axios
axios.defaults.baseURL = 'http://localhost:8000';

// Store token
function setToken(token) {
  localStorage.setItem('token', token);
  axios.defaults.headers.common['Authorization'] = \`Bearer \${token}\`;
}

async function login(email, password) {
  const response = await axios.post('/api/login', { 
    email, 
    password 
  });
  
  const { token } = response.data;
  setToken(token);
  
  return response.data;
}</pre>`}
          </div>
        </div>
      </div>
    </div>
    
    <div class="demo-box">
      <h3>Authentication Store in Svelte</h3>
      <p>Create a store to manage authentication state:</p>
      
      <div class="code-example">
        {@html `<pre>
// src/stores/auth.ts
import { writable } from 'svelte/store';
import axios from 'axios';

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  error: null
};

// Create the store
const createAuthStore = () => {
  const { subscribe, set, update } = writable(initialState);
  
  return {
    subscribe,
    
    login: async (email, password) => {
      update(state => ({ ...state, loading: true, error: null }));
      
      try {
        const response = await axios.post('/api/login', { email, password });
        const { user, token } = response.data;
        
        // Store token
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = \`Bearer \${token}\`;
        
        set({ user, token, isAuthenticated: true, loading: false, error: null });
        return { success: true };
      } catch (error) {
        update(state => ({ 
          ...state, 
          loading: false, 
          error: error.response?.data?.message || 'Login failed' 
        }));
        return { success: false };
      }
    },
    
    logout: async () => {
      try {
        // Call logout endpoint if needed
        if (initialState.token) {
          await axios.post('/api/logout');
        }
      } catch (e) {
        console.error('Logout error:', e);
      }
      
      // Clear storage and state
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      set({ ...initialState, token: null });
    },
    
    checkAuth: async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      axios.defaults.headers.common['Authorization'] = \`Bearer \${token}\`;
      
      update(state => ({ ...state, loading: true }));
      
      try {
        const response = await axios.get('/api/user');
        update(state => ({ 
          ...state, 
          user: response.data, 
          isAuthenticated: true, 
          loading: false 
        }));
      } catch (error) {
        // Token expired or invalid
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        set({ ...initialState, token: null });
      }
    }
  };
};

export const authStore = createAuthStore();</pre>`}
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>Authentication UI Components</h2>
    
    <div class="demo-box">
      <h3>Login Form Example</h3>
      
      <div class="login-example">
        <h4>Login Demo</h4>
        {#if !isAuthenticated}
          <form on:submit|preventDefault={login} class="auth-form">
            {#if errorMessage}
              <div class="error-message">{errorMessage}</div>
            {/if}
            
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                bind:value={email} 
                placeholder="user@example.com"
                required
              >
              <div class="hint">Try: user@example.com</div>
            </div>
            
            <div class="form-group">
              <label for="password">Password</label>
              <input 
                type="password" 
                id="password" 
                bind:value={password} 
                placeholder="Password"
                required
              >
              <div class="hint">Try: password</div>
            </div>
            
            <button type="submit" class="login-button">Log In</button>
          </form>
        {:else}
          <div class="auth-success">
            <div class="success-icon">✓</div>
            <h4>Successfully Authenticated</h4>
            <div class="token-display">
              <p>Your token:</p>
              <pre class="token">{token.substring(0, 20)}...</pre>
            </div>
            <button on:click={logout} class="logout-button">Log Out</button>
          </div>
        {/if}
      </div>
      
      <div class="code-example">
        {@html `<pre>
// LoginForm.svelte
&lt;script&gt;
  import { authStore } from '../stores/auth';
  
  let email = '';
  let password = '';
  let loading = false;
  
  async function handleSubmit() {
    loading = true;
    const result = await authStore.login(email, password);
    loading = false;
    
    if (result.success) {
      // Redirect after login
      window.location.href = '/dashboard';
    }
  }
&lt;/script&gt;

&lt;form on:submit|preventDefault={handleSubmit}&gt;
  &lt;div class="form-group"&gt;
    &lt;label for="email"&gt;Email&lt;/label&gt;
    &lt;input type="email" id="email" bind:value={email} required&gt;
  &lt;/div&gt;
  
  &lt;div class="form-group"&gt;
    &lt;label for="password"&gt;Password&lt;/label&gt;
    &lt;input type="password" id="password" bind:value={password} required&gt;
  &lt;/div&gt;
  
  {#if $authStore.error}
    &lt;div class="error"&gt;{$authStore.error}&lt;/div&gt;
  {/if}
  
  &lt;button type="submit" disabled={loading}&gt;
    {loading ? 'Logging in...' : 'Log In'}
  &lt;/button&gt;
&lt;/form&gt;</pre>`}
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>Route Protection with Svelte</h2>
    
    <div class="demo-box">
      <h3>Protecting Routes in SvelteKit</h3>
      
      <div class="code-example">
        {@html `<pre>
// src/hooks.client.js
import { goto } from '$app/navigation';
import { authStore } from './stores/auth';

// Subscribe to auth store changes
authStore.subscribe(state => {
  // Redirect logic can go here if needed
});

// Initialize auth state on app load
authStore.checkAuth();

// Protect routes in +layout.ts
export async function load({ url }) {
  // Get the current path
  const path = url.pathname;
  
  // Array of protected routes
  const protectedRoutes = ['/dashboard', '/settings', '/profile'];
  
  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    path.startsWith(route)
  );
  
  // Get auth state
  const auth = get(authStore);
  
  if (isProtectedRoute && !auth.isAuthenticated) {
    // Redirect to login
    goto('/login');
  }
  
  return {};
}</pre>`}
      </div>
      
      <h4>Creating a Protected Layout</h4>
      <div class="code-example">
        {@html `<pre>
// src/routes/dashboard/+layout.svelte
&lt;script&gt;
  import { authStore } from '../../stores/auth';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  
  onMount(() => {
    // Check if user is authenticated
    if (!$authStore.isAuthenticated) {
      goto('/login');
    }
  });
&lt;/script&gt;

{#if $authStore.isAuthenticated}
  &lt;slot&gt;&lt;/slot&gt;
{:else}
  &lt;p&gt;Loading...&lt;/p&gt;
{/if}</pre>`}
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>Security Best Practices</h2>
    
    <div class="demo-box">
      <h3>Keeping Your SPA Secure</h3>
      <ul class="security-list">
        <li>
          <strong>Use HttpOnly Cookies</strong> when possible for token storage
        </li>
        <li>
          <strong>Set Proper CORS Headers</strong> on your Laravel API
        </li>
        <li>
          <strong>Enable CSRF Protection</strong> by getting the CSRF cookie
        </li>
        <li>
          <strong>Set Token Expiration</strong> to reasonably short periods
        </li>
        <li>
          <strong>Implement Refresh Tokens</strong> for better security
        </li>
        <li>
          <strong>Secure API Routes</strong> with proper middleware
        </li>
        <li>
          <strong>Validate API Inputs</strong> on the server side
        </li>
        <li>
          <strong>Use HTTPS</strong> in production
        </li>
      </ul>
    </div>
  </section>

  <div class="next-steps">
    <h2>Next Steps</h2>
    <p>Now that you understand authentication with Laravel, check out:</p>
    <ul>
      <li><a href="/learning/api-integration">API Integration Techniques</a> - Learn how to integrate your Svelte app with Laravel API endpoints</li>
      <li><a href="/learning/forms">Form Handling and Validation</a> - Create and validate forms in Svelte</li>
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

  h5 {
    margin-top: 1rem;
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

  .note {
    background-color: var(--bg-secondary);
    border-left: 4px solid var(--warning-color);
    padding: 0.8rem 1rem;
    margin: 1rem 0;
    border-radius: 0 4px 4px 0;
    font-size: 0.95rem;
  }

  .auth-approaches {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .approach {
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 1rem;
  }

  .feature-list, .security-list {
    padding-left: 1.5rem;
  }

  .feature-list li, .security-list li {
    margin: 0.5rem 0;
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

  .login-example {
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1rem 0;
    max-width: 400px;
  }

  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .form-group label {
    font-weight: 500;
    font-size: 0.9rem;
  }

  .form-group input {
    padding: 0.6rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 1rem;
    background-color: var(--bg-color);
    color: var(--text-color);
  }

  .hint {
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-top: 0.3rem;
  }

  .error-message {
    background-color: rgba(239, 68, 68, 0.1);
    color: var(--error-color);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  .login-button {
    margin-top: 0.5rem;
  }

  .logout-button {
    background-color: var(--bg-secondary);
    color: var(--text-muted);
  }

  .logout-button:hover {
    background-color: var(--bg-color);
    color: var(--text-color);
  }

  .auth-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .success-icon {
    background-color: var(--success-color);
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .token-display {
    margin: 1rem 0;
    width: 100%;
  }

  .token {
    background-color: var(--bg-secondary);
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    margin-top: 0.5rem;
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

  @media (min-width: 768px) {
    .auth-approaches {
      flex-direction: row;
    }
    
    .approach {
      flex: 1;
    }
  }
</style> 