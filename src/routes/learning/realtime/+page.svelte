<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  // Chat demo state
  let messages = [
    { id: 1, user: 'System', text: 'Welcome to the chat!', time: new Date().toLocaleTimeString() },
    { id: 2, user: 'Alice', text: 'Hi everyone!', time: new Date().toLocaleTimeString() },
    { id: 3, user: 'Bob', text: 'Hello Alice!', time: new Date().toLocaleTimeString() }
  ];
  let newMessage = '';
  let username = 'Guest';
  let isConnected = false;
  let connectionStatus = 'Disconnected';
  
  // For notification demo
  let notificationCount = 0;
  let notifications: Array<{id: number, text: string, time: string}> = [];
  
  // For WebSocket connection simulation
  let mockWebSocket: any = null;
  
  // Connect to WebSocket (simulated)
  function connectWebSocket() {
    connectionStatus = 'Connecting...';
    
    // Simulate connection delay
    setTimeout(() => {
      isConnected = true;
      connectionStatus = 'Connected';
      
      // Create a mock WebSocket object
      mockWebSocket = {
        // Simulate receiving messages
        simulateIncomingMessage(data: any) {
          const message = {
            id: messages.length + 1,
            user: data.user,
            text: data.text,
            time: new Date().toLocaleTimeString()
          };
          messages = [...messages, message];
        },
        
        // Simulate receiving notifications
        simulateNotification(data: any) {
          const notification = {
            id: notifications.length + 1,
            text: data.text,
            time: new Date().toLocaleTimeString()
          };
          notifications = [...notifications, notification];
          notificationCount++;
        },
        
        // Simulate disconnection
        close() {
          isConnected = false;
          connectionStatus = 'Disconnected';
          this.onclose && this.onclose();
        },
        
        // Event handlers
        onmessage: null,
        onclose: null
      };
      
      // Demo auto messages
      startDemoMessages();
    }, 1500);
  }
  
  // Send a message
  function sendMessage() {
    if (!isConnected || !newMessage.trim()) return;
    
    const message = {
      id: messages.length + 1,
      user: username,
      text: newMessage,
      time: new Date().toLocaleTimeString()
    };
    
    messages = [...messages, message];
    newMessage = '';
    
    // Simulate a response after a delay
    setTimeout(() => {
      mockWebSocket.simulateIncomingMessage({
        user: 'Bot',
        text: `Echo: ${message.text}`
      });
    }, 1000);
  }
  
  // Simulate incoming messages for demo
  function startDemoMessages() {
    const demoMessages = [
      { user: 'Charlie', text: 'Just joined the chat!' },
      { user: 'Alice', text: 'Welcome Charlie!' },
      { user: 'Dave', text: 'Hi everyone, what did I miss?' }
    ];
    
    const demoNotifications = [
      { text: 'Alice started a new project' },
      { text: 'New feature available: Dark mode' },
      { text: 'System maintenance in 10 minutes' }
    ];
    
    // Send random messages periodically
    const messageInterval = setInterval(() => {
      if (!isConnected) {
        clearInterval(messageInterval);
        return;
      }
      
      const randomMessage = demoMessages[Math.floor(Math.random() * demoMessages.length)];
      mockWebSocket.simulateIncomingMessage(randomMessage);
    }, 8000);
    
    // Send random notifications periodically
    const notificationInterval = setInterval(() => {
      if (!isConnected) {
        clearInterval(notificationInterval);
        return;
      }
      
      const randomNotification = demoNotifications[Math.floor(Math.random() * demoNotifications.length)];
      mockWebSocket.simulateNotification(randomNotification);
    }, 12000);
    
    return () => {
      clearInterval(messageInterval);
      clearInterval(notificationInterval);
    };
  }
  
  // Clear notifications
  function clearNotifications() {
    notifications = [];
    notificationCount = 0;
  }
  
  // Connect on mount
  onMount(() => {
    connectWebSocket();
  });
  
  // Disconnect on destroy
  onDestroy(() => {
    if (mockWebSocket) {
      mockWebSocket.close();
    }
  });
</script>

<svelte:head>
  <title>Real-time Features | Learning Path</title>
</svelte:head>

<div class="container">
  <h1>Real-time Features with WebSockets</h1>
  <p class="back-link"><a href="/">← Back to Home</a></p>
  
  <section class="example-section">
    <h2>WebSockets in Svelte + Laravel</h2>
    <p>
      Real-time features enhance user experience by providing immediate feedback and updates without requiring page refreshes.
      This guide explains how to integrate WebSockets between your Svelte frontend and Laravel backend.
    </p>
  </section>

  <section class="example-section">
    <h2>WebSocket Basics</h2>
    <p>
      WebSockets provide a persistent connection between client and server, allowing bidirectional communication.
    </p>
    
    <div class="demo-box">
      <h3>Native WebSocket API</h3>
      <div class="code-example">
        {@html `<pre>
// Basic WebSocket connection in JavaScript
const socket = new WebSocket('ws://example.com/socket');

// Connection opened
socket.addEventListener('open', (event) => {
  console.log('Connected to WebSocket server');
  socket.send(JSON.stringify({ type: 'auth', token: 'user-token' }));
});

// Listen for messages
socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  console.log('Message from server:', data);
});

// Connection closed
socket.addEventListener('close', (event) => {
  console.log('Disconnected from WebSocket server');
});

// Handle errors
socket.addEventListener('error', (event) => {
  console.error('WebSocket error:', event);
});</pre>`}
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>Laravel WebSocket Options</h2>
    
    <div class="demo-box">
      <h3>Popular Laravel WebSocket Solutions</h3>
      <ul class="feature-list">
        <li>
          <strong>Laravel Echo + Laravel WebSockets</strong> - Open-source WebSocket server for Laravel
        </li>
        <li>
          <strong>Laravel Echo + Pusher</strong> - Pusher is a hosted WebSocket service with a generous free tier
        </li>
        <li>
          <strong>Laravel + Socket.IO</strong> - Using Socket.IO with Laravel for real-time features
        </li>
      </ul>
      
      <h4>Laravel WebSockets Setup</h4>
      <div class="code-example">
        {@html `<pre>
# Install Laravel WebSockets package
composer require beyondcode/laravel-websockets

# Publish the configuration and migrations
php artisan vendor:publish --provider="BeyondCode\LaravelWebSockets\WebSocketsServiceProvider" --tag="migrations"
php artisan vendor:publish --provider="BeyondCode\LaravelWebSockets\WebSocketsServiceProvider" --tag="config"

# Run migrations to create the websockets tables
php artisan migrate

# Install Laravel Echo and dependencies
npm install laravel-echo pusher-js</pre>`}
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>Laravel Broadcasting</h2>
    <p>
      Laravel's event broadcasting system integrates with WebSockets to send server-side events to the client.
    </p>
    
    <div class="demo-box">
      <h3>Configure Broadcasting in Laravel</h3>
      <div class="code-example">
        {@html `<pre>
// config/broadcasting.php
'connections' => [
    'pusher' => [
        'driver' => 'pusher',
        'key' => env('PUSHER_APP_KEY'),
        'secret' => env('PUSHER_APP_SECRET'),
        'app_id' => env('PUSHER_APP_ID'),
        'options' => [
            'cluster' => env('PUSHER_APP_CLUSTER'),
            'host' => env('PUSHER_HOST', '127.0.0.1'),
            'port' => env('PUSHER_PORT', 6001),
            'scheme' => env('PUSHER_SCHEME', 'http'),
            'useTLS' => env('PUSHER_SCHEME', 'https') === 'https',
        ],
    ],
],</pre>`}
      </div>
      
      <h4>Create a Broadcast Event</h4>
      <div class="code-example">
        {@html `<pre>
// Create an event
php artisan make:event NewMessage

// app/Events/NewMessage.php
namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewMessage implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;

    public function __construct($message)
    {
        $this->message = $message;
    }

    public function broadcastOn()
    {
        return new Channel('chat');
    }
}</pre>`}
      </div>
      
      <h4>Broadcast the Event</h4>
      <div class="code-example">
        {@html `<pre>
// In a controller or service
use App\Events\NewMessage;

public function sendMessage(Request $request)
{
    $message = [
        'user' => auth()->user()->name,
        'text' => $request->input('message'),
        'time' => now()->toTimeString()
    ];
    
    // Broadcast the event
    broadcast(new NewMessage($message))->toOthers();
    
    return response()->json($message);
}</pre>`}
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>Svelte + Laravel Echo Integration</h2>
    
    <div class="demo-box">
      <h3>Setting Up Laravel Echo in Svelte</h3>
      <div class="code-example">
        {@html `<pre>
// src/lib/echo.js
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Make Pusher available globally
window.Pusher = Pusher;

// Initialize Laravel Echo
const echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    wsHost: import.meta.env.VITE_PUSHER_HOST || window.location.hostname,
    wsPort: import.meta.env.VITE_PUSHER_PORT || 6001,
    forceTLS: (import.meta.env.VITE_PUSHER_SCHEME || 'https') === 'https',
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
});

export default echo;</pre>`}
      </div>
      
      <h4>Using Echo in a Svelte Component</h4>
      <div class="code-example">
        {@html `<pre>
&lt;script&gt;
  import { onMount, onDestroy } from 'svelte';
  import echo from '$lib/echo';
  
  let messages = [];
  let channel;
  
  onMount(() => {
    // Subscribe to the channel
    channel = echo.channel('chat');
    
    // Listen for the NewMessage event
    channel.listen('NewMessage', (event) => {
      messages = [...messages, event.message];
    });
  });
  
  onDestroy(() => {
    // Clean up the subscription
    if (channel) {
      channel.unsubscribe();
    }
  });
  
  // Send a message
  async function sendMessage(text) {
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ message: text })
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
&lt;/script&gt;</pre>`}
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>Private and Presence Channels</h2>
    
    <div class="demo-box">
      <h3>Authentication for Private Channels</h3>
      <p>
        Private channels require authentication to ensure only authorized users can subscribe.
      </p>
      
      <div class="code-example">
        {@html `<pre>
// Laravel routes/channels.php
Broadcast::channel('private-chat.{id}', function ($user, $id) {
    return $user->id === (int) $id || $user->hasAccessToChat($id);
});

// Svelte component
&lt;script&gt;
  import echo from '$lib/echo';
  
  onMount(() => {
    // Subscribe to a private channel
    const privateChannel = echo.private(\`chat.\${userId}\`);
    
    privateChannel.listen('NewMessage', (event) => {
      messages = [...messages, event.message];
    });
  });
&lt;/script&gt;</pre>`}
      </div>
      
      <h4>Presence Channels for User Awareness</h4>
      <p>
        Presence channels track who is subscribed, making them perfect for user presence features.
      </p>
      
      <div class="code-example">
        {@html `<pre>
// Laravel routes/channels.php
Broadcast::channel('presence-chat.{roomId}', function ($user, $roomId) {
    if ($user->canJoinRoom($roomId)) {
        return ['id' => $user->id, 'name' => $user->name];
    }
});

// Svelte component
&lt;script&gt;
  import echo from '$lib/echo';
  
  let users = [];
  
  onMount(() => {
    // Subscribe to a presence channel
    const presenceChannel = echo.join(\`presence-chat.\${roomId}\`);
    
    // When someone joins
    presenceChannel.here((members) => {
      users = members;
    });
    
    // When someone joins after we've joined
    presenceChannel.joining((user) => {
      users = [...users, user];
    });
    
    // When someone leaves
    presenceChannel.leaving((user) => {
      users = users.filter(u => u.id !== user.id);
    });
  });
&lt;/script&gt;</pre>`}
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>Interactive WebSocket Demo</h2>
    <p>
      This demo simulates a real-time chat application using WebSockets. It's not connecting to a real server but demonstrates the concepts.
    </p>
    
    <div class="demo-box">
      <h3>Real-time Chat Demo</h3>
      
      <div class="connection-status">
        Status: <span class={isConnected ? 'connected' : 'disconnected'}>{connectionStatus}</span>
        <button on:click={connectWebSocket} disabled={isConnected}>Connect</button>
        <button on:click={() => mockWebSocket?.close()} disabled={!isConnected}>Disconnect</button>
      </div>
      
      <div class="chat-container">
        <div class="chat-messages">
          {#each messages as message}
            <div class="message">
              <div class="message-header">
                <span class="user">{message.user}</span>
                <span class="time">{message.time}</span>
              </div>
              <div class="message-text">{message.text}</div>
            </div>
          {/each}
        </div>
        
        <div class="chat-input">
          <input 
            type="text" 
            bind:value={newMessage} 
            placeholder="Type a message..." 
            disabled={!isConnected}
            on:keydown={(e) => e.key === 'Enter' && sendMessage()}
          >
          <button on:click={sendMessage} disabled={!isConnected || !newMessage.trim()}>Send</button>
        </div>
      </div>
    </div>
    
    <div class="demo-box">
      <h3>Real-time Notifications</h3>
      
      <div class="notification-container">
        <div class="notification-header">
          <h4>Notifications ({notificationCount})</h4>
          <button on:click={clearNotifications} disabled={notifications.length === 0}>Clear All</button>
        </div>
        
        <div class="notifications">
          {#if notifications.length === 0}
            <p class="no-notifications">No notifications</p>
          {:else}
            {#each notifications as notification}
              <div class="notification">
                <div class="notification-text">{notification.text}</div>
                <div class="notification-time">{notification.time}</div>
              </div>
            {/each}
          {/if}
        </div>
      </div>
      
      <p class="note">
        Note: This demo simulates notifications being pushed from the server. 
        Connect to see new notifications appear automatically.
      </p>
    </div>
  </section>

  <section class="example-section">
    <h2>Common Real-Time Features</h2>
    
    <div class="demo-box">
      <h3>SaaS Real-Time Use Cases</h3>
      <ul class="feature-list">
        <li>
          <strong>Chat and Messaging</strong> - Real-time communication between users
        </li>
        <li>
          <strong>Notifications</strong> - Instant alerts for user actions or system events
        </li>
        <li>
          <strong>Live Data Updates</strong> - Dashboard with real-time metrics
        </li>
        <li>
          <strong>Collaborative Editing</strong> - Multiple users editing the same document
        </li>
        <li>
          <strong>Status Indicators</strong> - Show which users are online or currently active
        </li>
        <li>
          <strong>Real-time Validation</strong> - Instant feedback during form completion
        </li>
      </ul>
    </div>
  </section>

  <section class="example-section">
    <h2>Best Practices</h2>
    
    <div class="demo-box">
      <h3>WebSocket Tips</h3>
      <ul class="feature-list">
        <li>
          <strong>Always Handle Reconnection</strong> - Implement robust reconnection logic
        </li>
        <li>
          <strong>Optimize Payload Size</strong> - Send only the necessary data
        </li>
        <li>
          <strong>Authentication</strong> - Secure your WebSocket connections
        </li>
        <li>
          <strong>Fallback Mechanisms</strong> - Have a plan B if WebSockets aren't available
        </li>
        <li>
          <strong>Error Handling</strong> - Gracefully manage connection issues
        </li>
        <li>
          <strong>Testing</strong> - Test WebSocket functionality thoroughly
        </li>
      </ul>
    </div>
  </section>

  <div class="next-steps">
    <h2>Congratulations!</h2>
    <p>
      You've completed all the learning modules for building a SaaS application with Svelte and Laravel!
      You now have the knowledge to create a modern, responsive, and real-time web application.
    </p>
    <p>
      Don't forget to check out the official documentation for more advanced topics:
    </p>
    <ul>
      <li><a href="https://svelte.dev/docs" target="_blank">Svelte Documentation</a></li>
      <li><a href="https://kit.svelte.dev/docs" target="_blank">SvelteKit Documentation</a></li>
      <li><a href="https://laravel.com/docs" target="_blank">Laravel Documentation</a></li>
      <li><a href="https://laravel.com/docs/broadcasting" target="_blank">Laravel Broadcasting</a></li>
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
  }

  button:hover {
    background-color: #e03600;
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .note {
    background-color: #fff5e6;
    border-left: 4px solid #ffaa33;
    padding: 0.8rem 1rem;
    margin: 1rem 0;
    border-radius: 0 4px 4px 0;
    font-size: 0.95rem;
  }

  /* Chat styles */
  .connection-status {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .connected {
    color: #4caf50;
    font-weight: bold;
  }

  .disconnected {
    color: #f44336;
    font-weight: bold;
  }

  .chat-container {
    display: flex;
    flex-direction: column;
    height: 400px;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
  }

  .chat-messages {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
    background-color: white;
  }

  .message {
    margin-bottom: 1rem;
    padding: 0.8rem;
    background-color: #f0f0f0;
    border-radius: 4px;
  }

  .message-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.85rem;
  }

  .user {
    font-weight: bold;
    color: #0066cc;
  }

  .time {
    color: #666;
  }

  .message-text {
    color: #333;
  }

  .chat-input {
    display: flex;
    padding: 0.8rem;
    border-top: 1px solid #ddd;
    background-color: #f9f9f9;
  }

  .chat-input input {
    flex: 1;
    padding: 0.6rem;
    border: 1px solid #ddd;
    border-radius: 4px 0 0 4px;
    font-size: 1rem;
  }

  .chat-input button {
    border-radius: 0 4px 4px 0;
  }

  /* Notification styles */
  .notification-container {
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
  }

  .notification-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem;
    background-color: #f0f0f0;
    border-bottom: 1px solid #ddd;
  }

  .notification-header h4 {
    margin: 0;
  }

  .notifications {
    max-height: 200px;
    overflow-y: auto;
    background-color: white;
    padding: 0.5rem;
  }

  .notification {
    padding: 0.8rem;
    border-bottom: 1px solid #eee;
  }

  .notification:last-child {
    border-bottom: none;
  }

  .notification-text {
    margin-bottom: 0.3rem;
  }

  .notification-time {
    font-size: 0.8rem;
    color: #666;
  }

  .no-notifications {
    text-align: center;
    color: #666;
    padding: 1rem;
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