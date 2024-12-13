import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200', 
    env: {
      apiUrl: 'http://localhost:8080',
    },
    setupNodeEvents(on, config) {
      // Implement node event listeners if needed
    },
  },
});
