<script lang="ts">
  import { fly, fade } from 'svelte/transition';
</script>

<div class="about-page">
  <section class="hero" in:fly={{ y: 30, duration: 800 }}>
    <div class="hero-content">
      <div class="profile-image">
        <!-- Replace with your actual profile image -->
        <div class="profile-placeholder">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </div>
      </div>
      <div class="hero-text">
        <h1>Hey, I'm Mandeep Singh</h1>
        <p class="tagline">Full-stack Developer & Svelte Enthusiast</p>
        <div class="social-links">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
          </a>
        </div>
      </div>
    </div>
  </section>

  <section class="journey" in:fly={{ y: 30, duration: 800, delay: 200 }}>
    <h2>My Coding Journey</h2>
    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <h3>Beginning of the Journey</h3>
          <p class="timeline-date">2018</p>
          <p>Started learning HTML, CSS, and JavaScript through online courses and tutorials. Built my first static website and discovered my passion for web development.</p>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <h3>Diving into Full-stack</h3>
          <p class="timeline-date">2019-2020</p>
          <p>Expanded my knowledge to include backend technologies like Node.js, Express, and MongoDB. Created several MERN stack applications and began contributing to open-source projects.</p>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <h3>Professional Development</h3>
          <p class="timeline-date">2021-2022</p>
          <p>Landed my first developer role at [Company Name], where I worked on [specific projects or technologies]. Gained experience with agile methodologies and collaborative development.</p>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <h3>Discovering Svelte & SvelteKit</h3>
          <p class="timeline-date">2023-Present</p>
          <p>Fell in love with Svelte's simplicity and reactivity model. Created this learning platform to document my journey and help others learn Svelte. Currently exploring integration with Laravel for full-stack applications.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="projects" in:fly={{ y: 30, duration: 800, delay: 400 }}>
    <h2>Projects I'm Proud Of</h2>
    <div class="project-grid">
      <div class="project-card">
        <div class="project-header">
          <h3>Svelte Learning Platform</h3>
          <div class="project-links">
            <a href="https://github.com/yourusername/svelte-learning" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="https://your-demo-url.com" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        </div>
        <p>A comprehensive educational resource for learning Svelte and SvelteKit, featuring interactive examples, tutorials, and integration with Laravel backend.</p>
        <div class="project-tech">
          <span>Svelte</span>
          <span>SvelteKit</span>
          <span>TypeScript</span>
          <span>Laravel</span>
        </div>
      </div>

      <div class="project-card">
        <div class="project-header">
          <h3>Project Two</h3>
          <div class="project-links">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        </div>
        <p>Description of your second project. Highlight the problem it solves, interesting technical challenges, and your specific contributions.</p>
        <div class="project-tech">
          <span>React</span>
          <span>Node.js</span>
          <span>MongoDB</span>
        </div>
      </div>

      <div class="project-card">
        <div class="project-header">
          <h3>Project Three</h3>
          <div class="project-links">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        </div>
        <p>Description of your third project. Explain what makes this project unique and the value it provides to users or other developers.</p>
        <div class="project-tech">
          <span>Vue.js</span>
          <span>Firebase</span>
          <span>Tailwind CSS</span>
        </div>
      </div>
    </div>
  </section>

  <section class="skills" in:fly={{ y: 30, duration: 800, delay: 600 }}>
    <h2>Skills & Technologies</h2>
    <div class="skills-container">
      <div class="skill-category">
        <h3>Frontend</h3>
        <ul class="skill-list">
          <li>HTML5 & CSS3</li>
          <li>JavaScript (ES6+)</li>
          <li>TypeScript</li>
          <li>Svelte & SvelteKit</li>
          <li>React.js</li>
          <li>Vue.js</li>
          <li>Responsive Design</li>
          <li>CSS Frameworks (Tailwind, Bootstrap)</li>
        </ul>
      </div>

      <div class="skill-category">
        <h3>Backend</h3>
        <ul class="skill-list">
          <li>Node.js & Express</li>
          <li>PHP & Laravel</li>
          <li>RESTful APIs</li>
          <li>GraphQL</li>
          <li>Authentication & Authorization</li>
          <li>Database Design</li>
        </ul>
      </div>

      <div class="skill-category">
        <h3>Database & DevOps</h3>
        <ul class="skill-list">
          <li>MongoDB</li>
          <li>MySQL</li>
          <li>PostgreSQL</li>
          <li>Git & GitHub</li>
          <li>Docker</li>
          <li>CI/CD Pipelines</li>
          <li>AWS Services</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="contact" in:fly={{ y: 30, duration: 800, delay: 800 }}>
    <h2>Get in Touch</h2>
    <p>I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out through any of the platforms below.</p>
    <div class="contact-methods">
      <a href="mailto:your.email@example.com" class="contact-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        <span>your.email@example.com</span>
      </a>
      <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" class="contact-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        <span>LinkedIn</span>
      </a>
      <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" class="contact-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        <span>GitHub</span>
      </a>
    </div>
  </section>
</div>

<style>
  .about-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  section {
    margin-bottom: 4rem;
  }

  h1, h2, h3 {
    margin-top: 0;
  }

  h2 {
    margin-bottom: 2rem;
    font-size: 1.75rem;
    position: relative;
    display: inline-block;
  }

  h2::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background-color: var(--accent-color);
    border-radius: 2px;
  }

  /* Hero section */
  .hero {
    padding: 2rem 0 3rem;
    text-align: center;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .profile-image {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 1.5rem;
    background-color: var(--bg-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid var(--accent-color);
  }

  .profile-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
  }

  .hero-text h1 {
    font-size: 2.5rem;
    margin-bottom: 0.25rem;
  }

  .tagline {
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }

  .social-links {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .social-links a {
    color: var(--text-secondary);
    transition: color 0.2s ease, transform 0.2s ease;
  }

  .social-links a:hover {
    color: var(--accent-color);
    transform: translateY(-3px);
  }

  /* Journey section */
  .timeline {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
  }

  .timeline::before {
    content: '';
    position: absolute;
    width: 2px;
    background-color: var(--border-color);
    top: 0;
    bottom: 0;
    left: 20px;
  }

  .timeline-item {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 2.5rem;
    position: relative;
  }

  .timeline-marker {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--bg-secondary);
    border: 2px solid var(--accent-color);
    z-index: 1;
  }

  .timeline-content {
    padding: 0.5rem 0;
  }

  .timeline-content h3 {
    margin-bottom: 0.25rem;
    color: var(--heading-color);
  }

  .timeline-date {
    color: var(--accent-color);
    font-weight: 500;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  /* Projects section */
  .project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .project-card {
    background-color: var(--card-bg);
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px var(--shadow-color);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px var(--shadow-color);
  }

  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .project-header h3 {
    margin: 0;
    font-size: 1.25rem;
  }

  .project-links {
    display: flex;
    gap: 0.75rem;
  }

  .project-links a {
    color: var(--text-secondary);
    transition: color 0.2s ease;
  }

  .project-links a:hover {
    color: var(--accent-color);
  }

  .project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .project-tech span {
    font-size: 0.75rem;
    background-color: var(--bg-secondary);
    color: var(--text-secondary);
    padding: 0.3rem 0.6rem;
    border-radius: 20px;
  }

  /* Skills section */
  .skills-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
  }

  .skill-category h3 {
    margin-bottom: 1rem;
    color: var(--accent-color);
  }

  .skill-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .skill-list li {
    margin-bottom: 0.5rem;
    position: relative;
    padding-left: 1.5rem;
  }

  .skill-list li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--accent-color);
  }

  /* Contact section */
  .contact {
    text-align: center;
  }

  .contact p {
    max-width: 600px;
    margin: 0 auto 2rem;
  }

  .contact-methods {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-color);
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    background-color: var(--card-bg);
    text-decoration: none;
    transition: transform 0.3s ease, background-color 0.3s ease;
  }

  .contact-item:hover {
    transform: translateY(-3px);
    background-color: var(--hover-bg);
    text-decoration: none;
  }

  /* Responsive adjustments */
  @media (min-width: 768px) {
    .hero-content {
      flex-direction: row;
      text-align: left;
      gap: 2rem;
    }

    .profile-image {
      margin-bottom: 0;
    }

    .social-links {
      justify-content: flex-start;
    }

    .timeline::before {
      left: 50%;
      transform: translateX(-50%);
    }

    .timeline-item {
      width: 50%;
    }

    .timeline-item:nth-child(even) {
      margin-left: auto;
    }

    .timeline-item:nth-child(odd) .timeline-marker {
      order: 2;
      margin-left: auto;
      margin-right: -20px;
    }

    .timeline-item:nth-child(even) .timeline-marker {
      margin-left: -20px;
    }

    .timeline-item:nth-child(odd) .timeline-content {
      order: 1;
      text-align: right;
    }
  }
</style>
