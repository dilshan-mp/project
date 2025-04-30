const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    screenshotsFolder: "cypress/screenshots", // Folder for screenshots
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
