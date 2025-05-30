<script lang="ts">
  import { onMount } from 'svelte';
  import Prism from 'prismjs';
  
  // Import language support
  import 'prismjs/components/prism-typescript';
  import 'prismjs/components/prism-javascript';
  import 'prismjs/components/prism-css';
  import 'prismjs/components/prism-markup';
  import 'prismjs/components/prism-bash';
  import 'prismjs/components/prism-json';
  import 'prismjs/components/prism-php';
  
  export let code: string;
  export let language = 'javascript';
  export let showCopyButton = true;
  
  let copied = false;
  let codeElement: HTMLElement;
  
  function copyToClipboard() {
    navigator.clipboard.writeText(code).then(() => {
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    });
  }
  
  // Apply syntax highlighting when the component mounts
  onMount(() => {
    Prism.highlightElement(codeElement);
  });
</script>

<div class="code-block">
  <div class="code-header">
    <span class="language">{language}</span>
    {#if showCopyButton}
      <button class="copy-button" on:click={copyToClipboard}>
        {#if copied}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          Copied!
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          Copy
        {/if}
      </button>
    {/if}
  </div>
  <pre class="language-{language}"><code bind:this={codeElement} class="language-{language}">{code}</code></pre>
</div>

<style>
  .code-block {
    margin: 1.5rem 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .code-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: var(--code-header-bg);
    color: var(--text-muted);
    font-size: 0.85rem;
    border-bottom: 1px solid var(--border-color);
  }
  
  .language {
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.5px;
  }
  
  .copy-button {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    background: none;
    border: none;
    color: var(--text-muted);
    font-size: 0.85rem;
    cursor: pointer;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    transition: all 0.2s ease;
  }
  
  .copy-button:hover {
    background-color: var(--hover-bg);
    color: var(--text-color);
  }
  
  pre {
    margin: 0;
    padding: 1rem;
    overflow-x: auto;
    background-color: var(--code-bg);
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
  }
  
  code {
    font-family: 'Fira Code', monospace;
  }
</style> 