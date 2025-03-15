const { exec } = require('child_process');
const open = require('open');

// Start Metro bundler
const metro = exec('yarn start');

metro.stdout.on('data', (data) => {
  console.log(data);
  // Open the browser when Metro is ready
  if (data.includes('Metro waiting on')) {
    open('http://localhost:8081'); // Open the browser
  }
});

metro.stderr.on('data', (data) => {
  console.error(data);
});