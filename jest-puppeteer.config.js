module.exports = {
  server: {
    command: 'npm run start:dev',
    port: 8080,
    launchTimeout: 30000,
  },
  launch: {
    headless: true,
    timeout: 30000,
  },
  exitOnPageError: false
};
