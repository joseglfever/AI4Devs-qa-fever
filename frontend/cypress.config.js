const { defineConfig } = require('cypress');

module.exports = defineConfig({
  component: {
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/component.js",
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    env: {
      apiUrl: 'http://localhost:3010',
    },
    defaultCommandTimeout: 10000,
    viewportWidth: 1280,
    viewportHeight: 800,
  },
}); 