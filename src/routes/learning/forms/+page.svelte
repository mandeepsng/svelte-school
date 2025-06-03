<script lang="ts">
  import { onMount } from 'svelte';
  
  // Form state
  let name = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let bio = '';
  let acceptTerms = false;
  let favoriteColor = '';
  let skills = [];
  let role = 'user';
  
  // Error state
  let errors = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: ''
  };
  
  // Form submission state
  let isSubmitting = false;
  let submitted = false;
  let submitMessage = '';
  
  // Available options
  const colorOptions = ['red', 'blue', 'green', 'purple', 'orange'];
  const skillOptions = [
    { id: 1, name: 'HTML' },
    { id: 2, name: 'CSS' },
    { id: 3, name: 'JavaScript' },
    { id: 4, name: 'Svelte' },
    { id: 5, name: 'Laravel' }
  ];
  const roleOptions = [
    { value: 'user', label: 'Regular User' },
    { value: 'editor', label: 'Editor' },
    { value: 'admin', label: 'Administrator' }
  ];
  
  // Custom validator functions
  function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function validatePassword(password: string): boolean {
    return password.length >= 8;
  }
  
  // Validate the entire form
  function validateForm(): boolean {
    let isValid = true;
    
    // Reset errors
    errors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: ''
    };
    
    // Validate name
    if (!name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    } else if (name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
      isValid = false;
    }
    
    // Validate email
    if (!email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Validate password
    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (!validatePassword(password)) {
      errors.password = 'Password must be at least 8 characters long';
      isValid = false;
    }
    
    // Validate confirm password
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    // Validate terms acceptance
    if (!acceptTerms) {
      errors.acceptTerms = 'You must accept the terms and conditions';
      isValid = false;
    }
    
    return isValid;
  }
  
  // Handle form submission
  function handleSubmit() {
    if (validateForm()) {
      isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        isSubmitting = false;
        submitted = true;
        submitMessage = 'Form submitted successfully!';
        
        // Log form data (in a real app, we would send this to the server)
        console.log({
          name,
          email,
          password,
          bio,
          acceptTerms,
          favoriteColor,
          skills,
          role
        });
      }, 1500);
    }
  }
  
  // Reset the form
  function resetForm() {
    name = '';
    email = '';
    password = '';
    confirmPassword = '';
    bio = '';
    acceptTerms = false;
    favoriteColor = '';
    skills = [];
    role = 'user';
    
    submitted = false;
    submitMessage = '';
    
    errors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: ''
    };
  }
</script>

<svelte:head>
  <title>Form Handling and Validation | Learning Path</title>
</svelte:head>

<div class="container">
  <h1>Form Handling and Validation</h1>
  <p class="back-link"><a href="/">← Back to Home</a></p>
  
  <section class="example-section">
    <h2>Working with Forms in Svelte</h2>
    <p>
      Svelte provides a powerful and intuitive way to handle forms, making it easy to collect user input, validate data, and submit forms to your backend.
    </p>
  </section>

  <section class="example-section">
    <h2>Form Bindings</h2>
    <p>
      Svelte uses the <code>bind:</code> directive to create two-way bindings between form elements and JavaScript variables.
    </p>
    
    <div class="demo-box">
      <h3>Common Form Element Bindings</h3>
      
      <div class="code-example">
        <pre>
&lt;script&gt;
  let name = '';
  let email = '';
  let message = '';
  let subscribe = false;
  let rating = 5;
  let favoriteColor = 'blue';
  let skills = [];
&lt;/script&gt;

&lt;!-- Text input binding --&gt;
&lt;input type="text" bind:value={name}&gt;

&lt;!-- Email input binding --&gt;
&lt;input type="email" bind:value={email}&gt;

&lt;!-- Textarea binding --&gt;
&lt;textarea bind:value={message}&gt;&lt;/textarea&gt;

&lt;!-- Checkbox binding --&gt;
&lt;input type="checkbox" bind:checked={subscribe}&gt;

&lt;!-- Number input binding --&gt;
&lt;input type="range" bind:value={rating} min="1" max="10"&gt;

&lt;!-- Select binding --&gt;
&lt;select bind:value={favoriteColor}&gt;
  &lt;option value="red"&gt;Red&lt;/option&gt;
  &lt;option value="green"&gt;Green&lt;/option&gt;
  &lt;option value="blue"&gt;Blue&lt;/option&gt;
&lt;/select&gt;

&lt;!-- Multiple select binding --&gt;
&lt;select multiple bind:value={skills}&gt;
  &lt;option value="html"&gt;HTML&lt;/option&gt;
  &lt;option value="css"&gt;CSS&lt;/option&gt;
  &lt;option value="js"&gt;JavaScript&lt;/option&gt;
&lt;/select&gt;</pre>
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>Form Handling and Submission</h2>
    <p>
      Svelte makes it easy to handle form submissions and prevent the default behavior.
    </p>
    
    <div class="demo-box">
      <h3>Basic Form Submission</h3>
      <div class="code-example">
        {@html `<pre>
&lt;script&gt;
  let name = '';
  let email = '';
  
  function handleSubmit() {
    // Prevent default form submission
    // Send data to server
    console.log({ name, email });
  }
&lt;/script&gt;

&lt;form on:submit|preventDefault={handleSubmit}&gt;
  &lt;div&gt;
    &lt;label for="name"&gt;Name&lt;/label&gt;
    &lt;input id="name" bind:value={name} required&gt;
  &lt;/div&gt;
  
  &lt;div&gt;
    &lt;label for="email"&gt;Email&lt;/label&gt;
    &lt;input id="email" type="email" bind:value={email} required&gt;
  &lt;/div&gt;
  
  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</pre>`}
      </div>
      
      <p>The <code>on:submit|preventDefault</code> directive prevents the default form submission and allows you to handle it with JavaScript.</p>
    </div>
  </section>

  <section class="example-section">
    <h2>Form Validation</h2>
    <p>
      There are several approaches to form validation in Svelte.
    </p>
    
    <div class="demo-box">
      <h3>1. HTML5 Validation</h3>
      <p>
        The simplest form of validation uses built-in HTML5 attributes.
      </p>
      
      <div class="code-example">
        {@html `<pre>
&lt;input type="email" required minlength="3" maxlength="50"&gt;
&lt;input type="number" min="1" max="100"&gt;
&lt;input type="text" pattern="[A-Za-z]+"&gt;</pre>`}
      </div>
      
      <h3>2. Custom JavaScript Validation</h3>
      <p>
        For more complex validation logic, you can use JavaScript.
      </p>
      
      <div class="code-example">
        {@html `<pre>
&lt;script&gt;
  let email = '';
  let emailError = '';
  
  function validateEmail() {
    const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!re.test(email)) {
      emailError = 'Please enter a valid email address';
      return false;
    }
    emailError = '';
    return true;
  }
  
  function handleSubmit() {
    if (validateEmail()) {
      // Submit form
    }
  }
&lt;/script&gt;

&lt;form on:submit|preventDefault={handleSubmit}&gt;
  &lt;div&gt;
    &lt;label for="email"&gt;Email&lt;/label&gt;
    &lt;input 
      id="email" 
      type="email" 
      bind:value={email} 
      on:blur={validateEmail}
    &gt;
    {#if emailError}
      &lt;p class="error"&gt;{emailError}&lt;/p&gt;
    {/if}
  &lt;/div&gt;
  
  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</pre>`}
      </div>
      
      <h3>3. Form Validation Libraries</h3>
      <p>
        For complex forms, consider using validation libraries like:
      </p>
      <ul class="feature-list">
        <li><a href="https://github.com/noahsalvi/svelte-use-form" target="_blank">svelte-use-form</a></li>
        <li><a href="https://www.npmjs.com/package/svelte-forms-lib" target="_blank">svelte-forms-lib</a></li>
        <li><a href="https://github.com/chainlist/svelte-forms" target="_blank">svelte-forms</a></li>
      </ul>
    </div>
  </section>

  <section class="example-section">
    <h2>Connecting Forms to Laravel API</h2>
    
    <div class="demo-box">
      <h3>Submitting Form Data to Laravel</h3>
      <div class="code-example">
        {@html `<pre>
&lt;script&gt;
  import axios from 'axios';
  
  let form = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  };
  
  let errors = {};
  let loading = false;
  let success = false;
  
  async function handleSubmit() {
    loading = true;
    errors = {};
    
    try {
      // Submit to Laravel API
      const response = await axios.post('http://localhost:8000/api/register', form);
      success = true;
    } catch (error) {
      if (error.response?.status === 422) {
        // Laravel validation errors
        errors = error.response.data.errors;
      } else {
        errors = { general: 'An error occurred. Please try again.' };
      }
    } finally {
      loading = false;
    }
  }
&lt;/script&gt;

&lt;form on:submit|preventDefault={handleSubmit}&gt;
  {#if errors.general}
    &lt;div class="alert error"&gt;{errors.general}&lt;/div&gt;
  {/if}
  
  {#if success}
    &lt;div class="alert success"&gt;Registration successful!&lt;/div&gt;
  {/if}
  
  &lt;div class="form-group"&gt;
    &lt;label for="name"&gt;Name&lt;/label&gt;
    &lt;input id="name" bind:value={form.name}&gt;
    {#if errors.name}
      &lt;p class="error"&gt;{errors.name[0]}&lt;/p&gt;
    {/if}
  &lt;/div&gt;
  
  &lt;div class="form-group"&gt;
    &lt;label for="email"&gt;Email&lt;/label&gt;
    &lt;input id="email" type="email" bind:value={form.email}&gt;
    {#if errors.email}
      &lt;p class="error"&gt;{errors.email[0]}&lt;/p&gt;
    {/if}
  &lt;/div&gt;
  
  &lt;div class="form-group"&gt;
    &lt;label for="password"&gt;Password&lt;/label&gt;
    &lt;input id="password" type="password" bind:value={form.password}&gt;
    {#if errors.password}
      &lt;p class="error"&gt;{errors.password[0]}&lt;/p&gt;
    {/if}
  &lt;/div&gt;
  
  &lt;div class="form-group"&gt;
    &lt;label for="password_confirmation"&gt;Confirm Password&lt;/label&gt;
    &lt;input id="password_confirmation" type="password" bind:value={form.password_confirmation}&gt;
  &lt;/div&gt;
  
  &lt;button type="submit" disabled={loading}&gt;
    {loading ? 'Submitting...' : 'Register'}
  &lt;/button&gt;
&lt;/form&gt;</pre>`}
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>Interactive Form Example</h2>
    <p>
      Below is a complete example of a form with validation and handling.
    </p>
    
    <div class="demo-box">
      <h3>Registration Form</h3>
      
      {#if submitted}
        <div class="success-message">
          <p>{submitMessage}</p>
          <button on:click={resetForm}>Create New Form</button>
        </div>
      {:else}
        <form on:submit|preventDefault={handleSubmit} class="registration-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input 
              type="text" 
              id="name" 
              bind:value={name} 
              class:error={errors.name}
            >
            {#if errors.name}
              <p class="error-text">{errors.name}</p>
            {/if}
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              bind:value={email}
              class:error={errors.email}
            >
            {#if errors.email}
              <p class="error-text">{errors.email}</p>
            {/if}
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              bind:value={password}
              class:error={errors.password}
            >
            {#if errors.password}
              <p class="error-text">{errors.password}</p>
            {/if}
          </div>
          
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              bind:value={confirmPassword}
              class:error={errors.confirmPassword}
            >
            {#if errors.confirmPassword}
              <p class="error-text">{errors.confirmPassword}</p>
            {/if}
          </div>
          
          <div class="form-group">
            <label for="bio">Bio</label>
            <textarea 
              id="bio" 
              bind:value={bio} 
              rows="3"
              placeholder="Tell us about yourself"
            ></textarea>
          </div>
          
          <div class="form-group">
            <label>Favorite Color</label>
            <select bind:value={favoriteColor}>
              <option value="" disabled>Select a color</option>
              {#each colorOptions as color}
                <option value={color}>{color}</option>
              {/each}
            </select>
          </div>
          
          <div class="form-group">
            <label>Skills</label>
            <div class="checkboxes">
              {#each skillOptions as skill}
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    value={skill.id} 
                    bind:group={skills}
                  >
                  {skill.name}
                </label>
              {/each}
            </div>
          </div>
          
          <div class="form-group">
            <label>Role</label>
            <div class="radio-buttons">
              {#each roleOptions as roleOption}
                <label class="radio-label">
                  <input 
                    type="radio" 
                    name="role" 
                    value={roleOption.value} 
                    bind:group={role}
                  >
                  {roleOption.label}
                </label>
              {/each}
            </div>
          </div>
          
          <div class="form-group">
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                bind:checked={acceptTerms}
                class:error={errors.acceptTerms}
              >
              I accept the terms and conditions
            </label>
            {#if errors.acceptTerms}
              <p class="error-text">{errors.acceptTerms}</p>
            {/if}
          </div>
          
          <div class="form-actions">
            <button type="submit" disabled={isSubmitting}>
              {#if isSubmitting}
                Submitting...
              {:else}
                Submit
              {/if}
            </button>
            <button type="button" on:click={resetForm} class="reset-button">
              Reset
            </button>
          </div>
        </form>
      {/if}
    </div>
  </section>

  <div class="next-steps">
    <h2>Next Steps</h2>
    <p>Now that you understand form handling and validation, check out:</p>
    <ul>
      <li><a href="/learning/realtime">Real-time Features with WebSockets</a> - Add real-time functionality to your SaaS app</li>
      <li><a href="/learning/routing">SvelteKit Routing and SSR</a> - Learn about advanced routing features</li>
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

  .form-container {
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 1.5rem;
    margin: 2rem 0;
  }

  .form-title {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: var(--heading-color);
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  textarea,
  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 1rem;
    background-color: var(--bg-color);
    color: var(--text-color);
  }

  input[type="text"]:focus,
  input[type="email"]:focus,
  input[type="password"]:focus,
  textarea:focus,
  select:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px var(--accent-color-light);
  }

  textarea {
    min-height: 100px;
  }

  .checkbox-group {
    display: flex;
    align-items: center;
  }

  .checkbox-group input[type="checkbox"] {
    margin-right: 0.5rem;
  }

  .radio-group {
    margin: 0.5rem 0;
  }

  .error-message {
    color: var(--error-color);
    font-size: 0.9rem;
    margin-top: 0.3rem;
  }

  .validation-tip {
    color: var(--text-muted);
    font-size: 0.85rem;
    margin-top: 0.3rem;
  }

  .button-group {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .submit-btn {
    background-color: var(--accent-color);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .submit-btn:hover:not(:disabled) {
    background-color: var(--accent-color-dark);
  }

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .reset-btn {
    background-color: var(--bg-secondary);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }

  .reset-btn:hover {
    background-color: var(--hover-bg);
  }

  .spinner {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .success-message {
    background-color: rgba(16, 185, 129, 0.1);
    border: 1px solid var(--success-color);
    color: var(--success-color);
    padding: 1rem;
    border-radius: 4px;
    margin: 1.5rem 0;
    text-align: center;
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