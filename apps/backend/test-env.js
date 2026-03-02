// Quick test to verify environment variables are loaded
require('dotenv').config();

console.log('=== Environment Variables Debug ===');
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '***set***' : 'undefined');

// Test connection string parsing
if (process.env.DATABASE_URL) {
  const url = new URL(process.env.DATABASE_URL);
  console.log('\n=== Parsed DATABASE_URL ===');
  console.log('hostname:', url.hostname);
  console.log('port:', url.port);
  console.log('username:', url.username);
  console.log('password:', url.password);
  console.log('pathname:', url.pathname);
}
