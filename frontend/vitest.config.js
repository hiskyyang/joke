import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Enable global test functions like `describe` and `test`
    environment: 'jsdom', // Use jsdom for React tests
    transformMode: {
      web: [/node_modules/], // Ensure ES Modules in node_modules are transformed
    },
  },
});