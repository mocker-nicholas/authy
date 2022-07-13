const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1720,
  retries: {
    runMode: 2,
    openMode: 1,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    excludeSpecPattern: [],
  },
  // env: {
  //   PROD_BASE: "https://main--benevolent-scone-9283d1.netlify.app/",
  //   DEV_BASE: "http://localhost:3000/"
  // },
});
