// Simple sanity script to require the app and ensure no syntax errors
try {
  require('../api/app');
  console.log('App module loaded successfully');
} catch (err) {
  console.error('Sanity check failed:', err);
  process.exit(1);
}
